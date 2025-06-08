import { Teamspeak } from "../../Configs/TeamSpeak.Config"

class EventSystem{
    public readonly Name:string="Template"  
    public readonly Description:string=""  
    public readonly Active:boolean=false  

    constructor(){}

    public async Action(){
        console.log("test");
    }
}

const CallBack = new EventSystem()
module.exports = CallBack