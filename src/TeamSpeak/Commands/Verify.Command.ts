import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { log } from "console"
import { Config } from "../../Configs/Config"

class EventSystem{
    public readonly Name:string="Verify" 
    public readonly Command:string="Verify".toLocaleLowerCase()
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(Event:TextMessageEvent ,Data:any){
        const Client = await Event.invoker.getInfo()
        if(!Client.clientServergroups.includes(Config.TeamSpeak.Member)) {
            await Event.invoker.addGroups(Config.TeamSpeak.Member)
            Event.invoker.message("[B] 𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓣𝓱𝓮 [COLOR=#ff0044]𝓝𝓮𝓿𝓮𝓻[/COLOR][COLOR=#3ca785]𝓛𝓪𝓷𝓭[/COLOR][/B]")
        }else{
            Event.invoker.message("You Allready Verified...")
        }  
    }
}

const CallBack = new EventSystem()
module.exports = CallBack