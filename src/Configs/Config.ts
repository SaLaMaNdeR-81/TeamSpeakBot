
interface IConfig{
    Telegram: boolean;
    TeamSpeak:{
        Perfix:string;
        Member:string;
        Owners:Array<string>;
        Staffs:Array<string | null>;
    }
}

const Config :IConfig = {
    Telegram : false,
    TeamSpeak:{
        Perfix:"#",
        Member:"20", //Member Rank Id
        Owners:["2","51"],
        Staffs:[],
    }

}


export {Config}