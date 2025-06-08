import { TextMessageTargetMode } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
// import { Telegram } from "../Configs/Telegram.Config";


class EventSystem{
    public readonly Name:string="Ready"  
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(){
        const WMessage = " [B][color=#ff0044] Bot Is Active Now [/color][/B] "
        await Teamspeak.on("ready", async() => {
            const Info = await Teamspeak.serverInfo()  
            console.log(`✅ Connected to ${Info.virtualserverName}.`)
            await Teamspeak.sendTextMessage("0",TextMessageTargetMode.SERVER, WMessage);
            
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack