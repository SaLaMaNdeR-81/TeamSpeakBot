import { TeamSpeak ,QueryProtocol } from "ts3-nodejs-library"
import { EnvConfig } from "./ENV.Config";

interface IENV {
  TsHost: string;
  TsQP: number;
  TsSP: number;
  TsUsername: string;
  TsPassword: string;
  TsBotName: string;
}
const Teamspeak = new TeamSpeak({
  host: EnvConfig.TeamSpeak.Host,
  queryport: EnvConfig.TeamSpeak.QueryPort,
  serverport: EnvConfig.TeamSpeak.Port,
  username: EnvConfig.TeamSpeak.Username,
  password: EnvConfig.TeamSpeak.Password,
  nickname: EnvConfig.TeamSpeak.BotUserName
})

export {Teamspeak}