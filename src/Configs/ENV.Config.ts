import {config} from 'dotenv';
config();

type INodeENV = 'production' | 'test' | 'development';
interface IENV {
  NODE_ENV: INodeENV;
  PORT: number;
  MONGO_URI: string;

  TeamSpeak:{
    Host : string;
    QueryPort:number;
    Port: number;
    Username:string;
    Password:string;
    BotUserName:string;
  }

  Telegram:{
    Token: string;
    ChatId:string;
    ThreadId:string
  }

}



const ENV: IENV = {
  NODE_ENV: (process.env.NODE_ENV as INodeENV) || 'development',
  PORT: (parseInt(process.env.PORT || '3000', 10)),
  MONGO_URI: process.env.MONGO_URI as string,

  TeamSpeak:{
    Host: process.env.TEAMSPEAK_HOST as string,
    QueryPort: process.env.TEAMSPEAK_QUERYPORT as any,
    Port: process.env.TEAMSPEAK_PORT as any,
    Username: process.env.TEAMSPEAK_USERNAME as string,
    Password: process.env.TEAMSPEAK_PASSWORD as string,
    BotUserName: process.env.TEAMSPEAK_BOTNAME as string,
  },

  Telegram:{
    Token : process.env.TELEGRAM_TOKEN as string,
    ChatId : process.env.TELEGRAM_CHATID as string,
    ThreadId : process.env.TELEGRAM_THREADID as string,
  }

}

// lack of some env variable
// throw error
const EnvConfig = ENV
export {EnvConfig};