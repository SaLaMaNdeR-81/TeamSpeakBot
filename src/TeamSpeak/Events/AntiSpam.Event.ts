import { TextMessageTargetMode } from "ts3-nodejs-library";
import { Teamspeak } from "../../Configs/TeamSpeak.Config";

class AntiSpamSystem {
    public readonly Name: string = "AntiSpam";
    public readonly Description: string = "Prevents chat spam by tracking message frequency";
    public readonly Active: boolean = false;

    private messageLog: Map<string, { timestamps: number[] }> = new Map();
    private spamThreshold: number = 5; // messages
    private timeWindow: number = 10000; // 10 seconds
    private cooldown: number = 30000; // 30 seconds

    constructor() {}

    public async Action() {
        Teamspeak.on("textmessage", async (event) => {
            const invokerId = event.invoker.clid;
            const now = Date.now();

            // Skip messages not from clients (e.g., server query or bot itself)
            if (event.invoker.type === 1) return; // 1 = ServerQuery (bot or admin tool)

            if (!this.messageLog.has(invokerId)) {
                this.messageLog.set(invokerId, { timestamps: [] });
            }

            const log = this.messageLog.get(invokerId)!;
            log.timestamps = log.timestamps.filter(ts => now - ts < this.timeWindow);
            log.timestamps.push(now);

            if (log.timestamps.length > this.spamThreshold) {
                await Teamspeak.sendTextMessage(event.invoker.clid, TextMessageTargetMode.CLIENT, 
                    "⚠️ Please slow down, you are sending messages too quickly!");

                // Optional: kick or mute user
                await Teamspeak.clientKick(invokerId, 5, "Spamming chat");
                
                // Apply cooldown
                log.timestamps = [];
                setTimeout(() => {
                    // Cooldown ends
                }, this.cooldown);
            }
        });

        console.log("🛡️ AntiSpam system initialized.");
    }
}

const CallBack = new AntiSpamSystem();
module.exports = CallBack;
