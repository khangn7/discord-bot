const Discord = require("discord.js");

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
] })


//bot token,  check config.json for CHANNEL_IDS keys
const {BOT_TOKEN, CHANNEL_IDS} = require(__dirname + "/config.json");


client.on("ready", ()=>{ console.log("client on") })

client.login(BOT_TOKEN);

const bot_repsonses = {

    "jumpydino":[
        {
            "who is pro epic gamer": "jumpy dino, sir",
            "are you sure?": "positive, sir",
            "and who are these people talking over us?": "no one of importance, sir",
            "who agrees with me?": "everyone, sir",
            "who is not pro epic gamer?": "everyone but jumpy dino, sir",
            "die bot": "as you wish, sir"
        }
    ],

    "almondify":[
        {
            "die bot": "no u"
        }
    ]

}

client.on("messageCreate", message => { 
    
    console.log(message);

    if(message.channelId !== CHANNEL_IDS["testing"]){ return; }

    let msg_author = message.author.username,
        msg_content = message.content;

    if(bot_repsonses[msg_author][0][msg_content] === undefined){ 

        return; 
    }

    message.reply(bot_repsonses[msg_author][0][message.content]);

});





