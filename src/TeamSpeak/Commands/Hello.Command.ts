import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { Config } from "../../Configs/Config"

class EventSystem{
    public readonly Name:string="Hello" 
    public readonly Command:string="Hello".toLocaleLowerCase()
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    /*
    #   @Author: Salamander81
    *   Description: This module handles user authentication logic.
    *   Note: This module handles user authentication logic.
    *   Todo: 
    */

    constructor(){}

    public async Action(Event:TextMessageEvent ,Data:any){
        const Client = await Event.invoker.getInfo()
        const IsOwner = Config.TeamSpeak.Owners.some(Owner => Client.clientServergroups.includes(Owner))
        if(!IsOwner) return
        // console.log("IsOwner");

        const RankId = Data[1]
        const AllRanks = await Teamspeak.serverGroupList()
        const ExistRank = AllRanks.some(group => group.sgid === RankId)
        if(!ExistRank) return Event.invoker.message("⚠️ Rank Has not Exist.")

        const ClientDbId = Event.invoker.databaseId
        const ClientGroups = await Event.invoker.servergroups
        for(const Group of ClientGroups){
            await Event.invoker.delGroups(Group)
        }
        await Event.invoker.addGroups("51")
        console.log(ClientGroups);
    }
}

const CallBack = new EventSystem()
module.exports = CallBack