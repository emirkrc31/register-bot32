const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Ressam Rolü vermek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

if(etiketlenenKişi.roles.cache.has(ayarlar.ressamRol)) return message.channel.send(arwEmbed.setDescription(`Kullanıcıdan başarıyla <@&${ayarlar.ressamRol}> rolü alındı!`)).then(etiketlenenKişi.roles.remove(ayarlar.ressamRol))

etiketlenenKişi.roles.add(ayarlar.ressamRol)

message.react(client.emojis.cache.get(ayarlar.yes))

message.channel.send(arwEmbed.setDescription(`Kullanıcıya başarıyla <@&${ayarlar.ressamRol}> rolü verildi!`))//Matthe arweneyi çok seviyorrr

}
exports.config = {
    name: "ressam",
    guildOnly: true,
    aliases: ["ressam", "resim"]
}