const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Müzisyen Rolü vermek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

if(etiketlenenKişi.roles.cache.has(ayarlar.muzisyenRol)) return message.channel.send(arwEmbed.setDescription(`Kullanıcıdan başarıyla <@&${ayarlar.muzisyenRol}> rolü alındı!`)).then(etiketlenenKişi.roles.remove(ayarlar.muzisyenRol))

etiketlenenKişi.roles.add(ayarlar.muzisyenRol)

message.react(client.emojis.cache.get(ayarlar.yes))

message.channel.send(arwEmbed.setDescription(`Kullanıcıya başarıyla <@&${ayarlar.muzisyenRol}> rolü verildi!`))//Matthe arweneyi çok seviyorrr

}
exports.config = {
    name: "müzisyen",
    guildOnly: true,
    aliases: ["musician", "müzisyen"]
}