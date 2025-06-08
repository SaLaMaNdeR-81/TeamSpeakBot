import { TextMessageTargetMode } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"

class EventSystem{
    public readonly Name:string="Close"  
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(){
        await Teamspeak.on("close", async() => {
            console.log("🔌 Connection closed,trying to reconnect...")
            await Teamspeak.reconnect(-1, 1000)
            console.log("reconnected!")
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack