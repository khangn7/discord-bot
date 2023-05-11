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

const bot_responses = {

    "jumpydino":[
        {

            "!bully choi": "unique0",
            "!stop default": "unique1",

            "!check client on": "on",

            "!who is pro epic gamer": "jumpy dino, sir",
            "!are you sure?": "positive, sir",
            "!and who are these people talking over us?": "no one of importance, sir",
            "!who agrees with me?": "everyone, sir",
            "!who is not pro epic gamer?": "everyone but jumpy dino, sir",
            "!die bot": "as you wish, sir"
        }
    ],

    "almondify":[
        {
            "die bot": "no u"
        }
    ]

}

let bully_choi = false;
let bully_msgs = [
    "i bet ur mom fat",
    "Stop right there! Criminal scum.",
    "is it weird to be shorter than a brazilian iguana?",
    "...",
    "Disclaimer! The message above was generated from a pile lemming droppings masquerading as a human brain"
];

let stop_default_response = false;

client.on("messageCreate", message => { 
    
    // console.log(message);

    // if wrong channel
    if(message.channelId !== CHANNEL_IDS["testing"]){ return; }

    let msg_author = message.author.username,
        msg_content = message.content;

    if (bully_choi && msg_author === "almondify")
    {
        message.reply(bully_msgs[Math.round(Math.random() * 4)]);
        return;
    }

    // if message is by bot
    if (msg_author == 'pika pika')
    {
        return;
    }

    // if command to create custom response
    if (msg_content.slice(0, 3) === "csp")
    { console.log("csp returned");
        message.reply(customResponse(msg_author, msg_content));
        return;
    }

    let msg_map = bot_responses[msg_author][0][msg_content]

    if(msg_map === undefined)
    { console.log("undefined bot_response")
        return; 
    }

    if (msg_map === "unique0")
    {
        bully_choi = !bully_choi;
        return;
    }

    if (msg_map === "unique1")
    {
        stop_default_response = !stop_default_response;
        return;
    }

    if (stop_default_response)
    {
        return;
    }

    message.reply(msg_map);
    console.log("bot_responsed");

});

function customResponse(author, cmd_str)
{
    if (cmd_str.length === 3)
    {
        return "help: 'csp'\nusage: 'csp $<prompt>$<bot_response>' \nthere should be exactly 2 dollar signs present in command";
    }

    let argv = cmd_str.split("$");

    if (argv.length !== 3)
    {
        return "ERROR: incorrect syntax\nusage: 'csp $<prompt>$<bot_response>'\ntype 'csp' for help";
    }

    bot_responses[author][0][argv[1]] = argv[2];

    return "sucessfully created " + author + "'s custom response";
}



