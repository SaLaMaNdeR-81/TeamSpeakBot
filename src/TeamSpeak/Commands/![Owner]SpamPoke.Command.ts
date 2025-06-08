import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { Config } from "../../Configs/Config"

class EventSystem{
    public readonly Name:string="Spampoke" 
    public readonly Command:string="Spampoke".toLocaleLowerCase()
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(Event:TextMessageEvent ,Data:Array<string>){
        const Client = await Event.invoker.getInfo()
        const IsOwner = Config.TeamSpeak.Owners.some(Owner => Client.clientServergroups.includes(Owner))
        if(!IsOwner) return
        // console.log("IsOwner");

        const Command = Event.msg.slice(Config.TeamSpeak.Perfix.length).trim()  
        const SplitedCommand = Command.split(" ")
        
        const Target = await Teamspeak.getClientByUid(SplitedCommand[2])
        const Time = 1000
        let Counter = 0
        const HMessage = "[color=gray] Spampoke <Number> <TargetUID> [/color]"
        if(Data.length == 1) return Event.invoker.message(HMessage)
        const Loop = parseInt(Data[1])
        if(!Target) return
        
        const Pokeinterval = setInterval(async() => {
            Counter++
            Target?.poke(`${Counter}- i Love You :)`)

            if(Counter >= Loop)clearInterval(Pokeinterval)
        }, Time);

    }
}

const CallBack = new EventSystem()
module.exports = CallBack