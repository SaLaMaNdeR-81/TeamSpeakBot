import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { Config } from "../../Configs/Config"

class EventSystem{
    public readonly Name:string="Rank" 
    public readonly Command:string="Rank".toLocaleLowerCase()
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(Event:TextMessageEvent ,Data:Array<string>){
        const Client = await Event.invoker.getInfo()
        const IsOwner = Config.TeamSpeak.Owners.some(Owner => Client.clientServergroups.includes(Owner))
        if(!IsOwner) return
        // console.log("IsOwner");
        const HMessage = "[color=gray] Rank <Set/Remove> <RankId> <UId> [/color]"

        const Command = Event.msg.slice(Config.TeamSpeak.Perfix.length).trim()  
        const SplitedCommand = Command.split(" ")

        const State = Data[1]
        const Target = await Teamspeak.getClientByUid(SplitedCommand[3])
        const RankId = Data[2]
        const AllRanks = await Teamspeak.serverGroupList()
        const ExistRank = AllRanks.some(group => group.sgid === RankId)

        // console.log(Target);

        if(Data.length == 1) return Event.invoker.message(HMessage)
        if (State !== "set" && State !== "remove") return Event.invoker.poke("[color=gray] [Set || Remove] [/color]")
        if(!ExistRank) return Event.invoker.poke("⚠️ Rank Has not Exist.") 

        const TargetHasRank = Target?.servergroups.includes(RankId)
        if(State === "set"){
            if(TargetHasRank) return Event.invoker.poke("[color=red] ⚠️Target Already Have Rank. [/color]")
            await Target?.addGroups(RankId)
        }
        if(State === "remove"){
            if(!TargetHasRank) return Event.invoker.poke("[color=red] ⚠️Target dosnt Have Rank. [/color]")
            await Target?.delGroups(RankId)
        }
    }
}

const CallBack = new EventSystem()
module.exports = CallBack