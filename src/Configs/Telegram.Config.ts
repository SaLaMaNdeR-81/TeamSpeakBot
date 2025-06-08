import TelegramBot,{Message} from "node-telegram-bot-api";
import { SocksProxyAgent } from 'socks-proxy-agent';
import { EnvConfig } from "./ENV.Config";
import { Config } from "./Config";

const proxyUrl = 'socks5h://127.0.0.1:9050'; 
const agent = new SocksProxyAgent(proxyUrl);


const Telegram = new TelegramBot(EnvConfig.Telegram.Token as any, {
    polling: true,
    request: {
        agent,
    } as any,
});

export {Telegram ,Message};