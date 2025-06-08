import { Teamspeak } from "../../Configs/TeamSpeak.Config"
import * as moment from 'jalali-moment';
import { getTimeAge } from "../../Module/TimeAge";
import { Timeformater } from "../../Module/timeFormatter";

class EventSystem{
    public readonly Name:string="WelCome"  
    public readonly Description:string=""  
    public readonly Active:boolean=true  

    constructor(){}

    public async Action(){
        Teamspeak.on("clientconnect", async(e) => {
            const Client = e.client
            const Info = await Teamspeak.clientInfo(Client.clid)
            const FirstLog = moment.unix(Client.created).locale('fa').format("jYYYY-jMM-jDD HH:mm")

            const WMessage =`[B]𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓣𝓱𝓮 [/B][color=#00FF00]𝓷[/color][color=#26E939]𝓮[/color][color=#4DD373]𝓿[/color][color=#73BDAC]𝓮[/color][color=#99A7E6]𝓻[/color][color=#BF91FF]𝓵[/color][color=#D67ACC]𝓪[/color][color=#EC6493]𝓷[/color][color=#FFA500]𝓭[/color]
            
            [B] 🗿𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧[/B][${Info[0].clientTotalconnections}]
            [B] 🥤𝐂𝐫𝐞𝐚𝐭𝐢𝐨𝐧 [/B]► ${FirstLog} (${getTimeAge(Client.created * 1000)})
            [B] ⏳𝐀𝐜𝐭𝐢𝐯𝐢𝐭𝐲 [/B]► ${Timeformater(Info[0].clientTotalOnlineTime)}
            [B] 🆔𝐈𝐩 [/B]► [color=#73BDAC]${Client.connectionClientIp}[/color]
            
            `

            await Client.message(WMessage)
            // await Client.message("")
        })
    }
}

const CallBack = new EventSystem()
module.exports = CallBack