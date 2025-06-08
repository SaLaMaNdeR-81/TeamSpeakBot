import { TeamSpeak , TextMessageEvent } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"

class EventSystem{
    public readonly Name:string="Template"  
    public readonly Command:string="Template"  
    public readonly Description:string=""  
    public readonly Active:boolean=false  

    constructor(){}

    public async Action(Event:TextMessageEvent){
        console.log("test123");
    }
}

const CallBack = new EventSystem()
module.exports = CallBack