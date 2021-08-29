const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.ustyetkili.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Kayıt Yetkisi Vermek İçin Bir Kişi Etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  

etiketlenenKişi.roles.add(ayarlar.yetkiReg)
etiketlenenKişi.roles.add(ayarlar.yetkiReg2)


message.react(client.emojis.cache.get(ayarlar.yes))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcıya <@&${ayarlar.yetkiReg}>, <@&${ayarlar.yetkiReg2}> rolleri verildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})) //Matthe arweneyi çok seviyorrr
.setTimestamp()

message.channel.send(arwEmbed)

client.channels.cache.get(ayarlar.yetkiliKanal).send(`${etiketlenenKişi}, **Yetkin Hayırlı Olsun, Lütfen** <#875334915359641713> **Kanalından Yetkili Kurallarını Okumayı Unutma!**`)
  
}
exports.config = {
    name: "yetki",
    guildOnly: true,
    aliases: ["yetki", "yetkiver", "yetki-ver", "veryetkiyigöretkiyi"]
}