const discord = require('discord.js');
const bot = new discord.Client({ intents: ["GUILDS","GUILD_MESSAGES"] })

const prefix = "&"

let sCommand = [
    {
        name:"ping",
        description:"devuelve el ping del bot",
        run:async(bot,interaction,args) => {
            await interaction.followUp({content:`Ping: ${bot.ws.ping}ms`})
        }
    },
    {
        name:"hola",
        description:"devuelve un saludo",
        run:async(bot,interaction,args) => {
            await interaction.followUp({content:"hola nero"})
        }
    }
]
bot.slash = new discord.Collection()

const me = new discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle("Hola como andai")
    .setURL("http://www.google.com")
    .setAuthor(
        "Perrito", 
        "http://los40ar00.epimg.net/los40/imagenes/2020/09/11/tecnologia/1599840475_254452_1599841345_noticia_normal.jpg",
        "https://discord.com"
    )
    .setDescription("Contenido principal")
    .setImage("http://los40ar00.epimg.net/los40/imagenes/2020/09/11/tecnologia/1599840475_254452_1599841345_noticia_normal.jpg")
    .addFields({name:"Contenido 1", value:"Valor del contenido 1"})

bot.on('ready', async () => {
  console.log("**************************************************************")
  console.log(`Logged in as ${bot.user.tag}!\nStatus: ${bot.presence.status}`);
  bot.user.setActivity("porno", {type:"WATCHING"})
  console.log("**************************************************************\n\n")
  console.log("**********************CONSOLE LOGS****************************")

  bot.slash.set(sCommand[0].name,sCommand[0])
  bot.slash.set(sCommand[1].name,sCommand[1])

  await bot.application.commands.set(sCommand)
});

bot.on("interactionCreate", async (interaction)=> {
    if(interaction.isCommand()) {
        await interaction.deferReply({ephemeral:false}).catch((obj)=>{console.log(obj)})
    }
    console.log(bot.slash.get(interaction.commandName))
    const command = bot.slash.get(interaction.commandName)

    if (!command) {
        interaction.followUp({content:"Comando no registrado"})
    }
    const args = []
    try {
        command.run(bot,interaction,args)
    } catch (err) {
        console.log(err)
    }
})

bot.on("messageCreate", (msg) => {
   //console.log(msg)
    if(msg.author.bot) return

        if(msg.content.toLowerCase().startsWith(prefix)){

            const texto = msg.content.slice(prefix.length).split(/ +/)
            const command = texto.shift().toLowerCase()

            console.log(texto)
            console.log(command)

            if (command==="saludar") {
                msg.channel.send({embeds:[me]})
            }

            if (command === "suma") {
                msg.reply (`El resultado es: ${parseFloat(texto[0]) + parseFloat(texto[1])} `)
            }
        }
        
    
    
})



bot.login('OTY4MjYzODQyNjc5Mzg2MTIz.YmcT-Q.itlbrsnYWyLEbE_qLh1JFFebKhc');