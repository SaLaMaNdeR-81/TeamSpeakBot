import { TextMessageTargetMode } from "ts3-nodejs-library"
import * as moment from 'jalali-moment';
import { Telegram } from "../../Configs/Telegram.Config"
import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import { EnvConfig } from "../../Configs/ENV.Config"

class EventSystem{
    public readonly Name:string="Logger"  
    public readonly Description:string=""  
    public readonly Active:boolean=true

    private readonly Date:string =  moment.unix(Date.now() / 1000).locale('fa').format('jYYYY - jMM - jDD');

    constructor(){}

    public async Action(){
        Teamspeak.on('clientconnect', async(e)=>{
            const Client = e.client;
            const Info = await Client.getInfo()
            const Message = `[${this.Date}](${Info.clientTotalconnections})\n\n✅ ${Client.nickname} Connected`
            await Telegram.sendMessage(EnvConfig.Telegram.ChatId as any, Message, {
                reply_to_message_id: Number(EnvConfig.Telegram.ThreadId),
            });
        })
        
        Teamspeak.on('clientdisconnect', async(e)=>{
            const Client = e.client;
            const Event = e.event
            if (Client) {
                const Message = `❌ ${Client.nickname} DisConnected\n\t\t\t\t${Event.reasonmsg}\n\t\t\t\t[${Event.bantime}][${Event.invokername}]`
                await Telegram.sendMessage(EnvConfig.Telegram.ChatId as any, Message, {
                    reply_to_message_id: Number(EnvConfig.Telegram.ThreadId),
                });
            }
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack