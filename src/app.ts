import {Teamspeak} from './Configs/TeamSpeak.Config'
import { CommandsHandler, EventHandler } from './TeamSpeak'
// import {Telegram,Message} from './Configs/Telegram.Config'
import { EnvConfig } from './Configs/ENV.Config'
import { TextMessageTargetMode } from 'ts3-nodejs-library';
import { Telegram } from './Configs/Telegram.Config';


export class App{

    constructor(){
        this.InitializeTeamspeak();

        this.Test();
    }
    
    private InitializeTeamspeak(){
        EventHandler();
        CommandsHandler();
    }

    private Test(){
        Telegram.onText(/\/start/, (msg) => {
            Telegram.sendMessage(msg.chat.id, `Id : ${msg.chat.id} \n T : ${msg.message_thread_id}`);
        });
    }

}