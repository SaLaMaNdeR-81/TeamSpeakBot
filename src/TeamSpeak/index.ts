import { Teamspeak } from "../Configs/TeamSpeak.Config";
import Path from 'path'
import Fs from 'fs'
import { EnvConfig } from "../Configs/ENV.Config";
import { Config } from "../Configs/Config";

//# =============              =============
//#              ==============
//!              Events Handler 
//#              ==============
//# =============              =============

const EventHandler = ()=>{
    const EPath = Path.join(__dirname,'Events')
    const EventsFolders = Fs.readdirSync(EPath).filter(file => file.endsWith('.Event.ts'));
    let EventsList = []
    
    for(const RouterFile of EventsFolders){
      const FixRouterFile = RouterFile.slice(0,-3)
      const Event = require(`./Events/${FixRouterFile}`);
      EventsList.push(Event)
      
      if(Event.Active)Event.Action()
    }
}

//# =============              =============
//#              ==============
//!             Commands Handler 
//#              ==============
//# =============              =============

const CommandsHandler = ()=>{
    const CPath = Path.join(__dirname,'Commands')
    const CFolders = Fs.readdirSync(CPath).filter(file => file.endsWith('.Command.ts'));
    const CList = new Map()

    for(const File of CFolders){
      const FixedFile = File.slice(0,-3)
      const Commmand = require(`./Commands/${FixedFile}`)
      if (Commmand.Active) CList.set(Commmand.Command,Commmand.Action); 
    }

    Teamspeak.on('textmessage', async(e)=>{
      const Message = e.msg.toLocaleLowerCase()
      const Perfix = Config.TeamSpeak.Perfix
      if (e.invoker.nickname === EnvConfig.TeamSpeak.BotUserName)return
      if (!Message.startsWith(Perfix))return
      const Command = Message.slice(Perfix.length).trim()  
      const SplitedCommand = Command.split(" ")
      const Action = CList.get(SplitedCommand[0])
      if(Action) {
        Action(e,SplitedCommand)
      }
    })

    // console.log(CList);
}

export {EventHandler,CommandsHandler}