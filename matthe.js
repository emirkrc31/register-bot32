// Arwene#0836 tarafından Matthe için kodlanmıştır.

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const moment = require("moment"); //Matthe#1000
const fs = require("fs");
const db = require("quick.db");
const chalk = require("chalk");
require("./util/Loader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`); //Arwene#0836
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

client.on("message", async message => {
  if (message.content === "!tag") {
    message.channel.send(`✰`); //Arwene#0836
  }

  if (message.content === ".tag") {
    message.channel.send(`✰`); //Arwene#0836
  }

  if (message.content === "tag") {
    message.channel.send(`✰`); //Arwene#0836
  }

  if (message.content === "-tag") {
    message.channel.send(`✰`); //Arwene#0836
  }
});

client.on("ready", () => {
  console.log(chalk.redBright(`tm`));
});

client.on("guildMemberAdd", async member => {
  let arwSayılar = {
    "0": `${ayarlar.sifirEmoji}`,
    "1": `${ayarlar.birEmoji}`,
    "2": `${ayarlar.ikiEmoji}`,
    "3": `${ayarlar.ucEmoji}`,
    "4": `${ayarlar.dortEmoji}`,
    "5": `${ayarlar.besEmoji}`,
    "6": `${ayarlar.altiEmoji}`,
    "7": `${ayarlar.yediEmoji}`,
    "8": `${ayarlar.sekizEmoji}`,
    "9": `${ayarlar.dokuzEmoji}` //Matthe#1000
  };

  const arwKanal = client.channels.cache.get(ayarlar.hosgeldinKanal);
  let arwMember = member.user;
  let arwZaman = new Date().getTime() - arwMember.createdAt.getTime();
  const arw = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! ${client.emojis.cache.get(
    ayarlar.yes
  )}`; //Arwene#0836
  if (arwZaman < 1296000000) {
    arw = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! ${client.emojis.cache.get(
      ayarlar.no
    )}`; //Matthe#1000
  }

  member.roles.add(ayarlar.kayıtsızRol);
  member.roles.add(ayarlar.kayıtsızRol);
  member.roles.add(ayarlar.kayıtsızRol); //Arwene#0836

  member.setNickname(`${ayarlar.tag} İsim ${ayarlar.sembol} Yaş`);
  arwKanal.send(`
${client.emojis.cache.get(
  ayarlar.hosgeldinMesajEmoji
)}  Sunucumuza hoş geldin, ${member}! Sayende sunucumuz ${member.guild.memberCount
    .toString()
    .split("")
    .map(a => client.emojis.cache.get(arwSayılar[a]))
    .join("")} kişi.

${client.emojis.cache.get(
  ayarlar.hosgeldinMesajEmoji
)}  Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!

${client.emojis.cache.get(
  ayarlar.hosgeldinMesajEmoji
)}  Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  ${arw}

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Ceza işlemlerin <#${
    ayarlar.rulesKanal
  }> kanalını okuduğun varsayılarak uygulanır. ( <@&${
    ayarlar.hosgeldinMesajYetkili
  }> )
`);
});

client.login(process.env.TOKEN);

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
});
//Matthe arweneyi çok seviyorrr

//------------------------------------------------------------------------------------------------------------------------------------\\

//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("875334912905973781"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "✰"; // Buraya Ekip Tag
  var tagrol = "875334913124085795"; // Buraya Ekip Rolünün ID
  var logKanali = "875377915230048306"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.cache.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(
        `Tagımızı aldığın için teşekkürler! Umarım Sunucumuzda İyi Vakit Geçirirsin. :)`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`)
        );
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.cache.filter(
          rol => rol.position >= sunucu.roles.cache.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için family rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              `${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\

client.on("guildMemberAdd", member => {
  let sunucuid = "875334912905973781"; //Buraya sunucunuzun IDsini yazın
  let tag = "✰"; //Buraya tagınızı yazın
  let rol = "875334913124085795"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  if (member.user.username.includes(tag)) {
    member.roles.add(rol);
    const tagalma = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`
      )
      .setTimestamp();
    client.channels.cache.get("875377915230048306").send(tagalma);
  }
});

//-----------------------TAG-KONTROL----------------------\\     -------\\
