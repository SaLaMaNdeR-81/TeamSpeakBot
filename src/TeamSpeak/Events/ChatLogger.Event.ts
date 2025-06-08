import { TextMessageTargetMode } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { Telegram,Message } from "../../Configs/Telegram.Config"

import { EnvConfig } from "../../Configs/ENV.Config"
import { Config } from "../../Configs/Config"

class EventSystem{
    public readonly Name:string="ChatLogger"  
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(){
        await Teamspeak.on("textmessage", async(e) => {
            const Client = e.invoker
            if (e.targetmode === 1) return
            if (Client.nickname === EnvConfig.TeamSpeak.BotUserName) return
            if (e.msg.startsWith(Config.TeamSpeak.Perfix)) return
            const Message = `💬[ ${Client.nickname} ] : ${e.msg}`
            await Telegram.sendMessage(EnvConfig.Telegram.ChatId as any, Message, {
                reply_to_message_id: Number(EnvConfig.Telegram.ThreadId),
            });
        })

        await Telegram.on('message', async (Message: Message) => {
            const Sender = Message.chat.id;
            if (Sender !== Number(EnvConfig.Telegram.ChatId)) return;
            if (
                EnvConfig.Telegram.ThreadId &&
                Message.message_thread_id === undefined && 
                Message.message_thread_id !== Number(EnvConfig.Telegram.ThreadId)
            ) return;
            // if (Message.from?.is_bot) return;
            const text = Message.text || '';
            if (!text) return;
            
            const tsMessage = `💬[Telegram][${Message.from?.first_name || 'Unknown'}]: ${text}`;
            await Teamspeak.sendTextMessage("0",TextMessageTargetMode.SERVER, tsMessage);
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack