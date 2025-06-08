import { TextMessageTargetMode } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"

class EventSystem{
    public readonly Name:string="ErrorHandler"  
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(){
        await Teamspeak.on("error", async(err) => {
            console.error("❌ Error:", err.message)
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack