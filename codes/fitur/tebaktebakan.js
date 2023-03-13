__path = process.cwd()
module.exports = async (md, m, fetchJson, bot, type, body, budy, prefix, isCommand, command, isGroup, md1, pushname, q, args, content, sender, from, nama, namabot, owner, reply, donasi, isMedia, isQuotedImage, isQuotedVideo, isQuotedSticker, isQuotedAudio) => {  
try {
const groupMetadata = isGroup ? await md.groupMetadata(from) : '';
const uwong = isGroup ? await groupMetadata.participants : '';
const groupAdmins = isGroup ? await uwong.filter(v => v.admin !== null).map(a => a.id) : '';
const isBotGroupAdmins = groupAdmins.includes(md.user.id.split(':')[0] + '@s.whatsapp.net') || false;

if (isGroup){
  if (!isBotGroupAdmins) return md.sendMessage(from, {text: "Jadikan bot admin untuk mengoptimalkan fitur game ini"},{quoted: md1 })
}
var games = await fetchJson(`https://raw.githubusercontent.com/naylachan/GAMES/main/${command}.json`)

const deleteMess = () => {
  var key = {
    remoteJid: m.messages[0].key.remoteJid,
    fromMe: m.messages[0].key.fromMe,
    id: m.messages[0].message.listResponseMessage.contextInfo.stanzaId,
    participant: m.messages[0].message.listResponseMessage.contextInfo.participant
  }
  md.sendMessage(from, { delete: key })
}

if (!q){
var rows1 = []
var rows = []

for (let a = 0; a < 10; a++){
  rows1.push(games[Math.floor(Math.random() * games.length)])
}
for (let a = 0; a < rows1.length; a++){  
  rows.push({title: rows1[a].jawaban, rowId: prefix + command + ` ${rows1[a].jawaban}`} )
}
var rows2 = rows1[Math.floor(Math.random() * rows1.length)]
console.log(rows2.jawaban)
md.sendMessage(from, {
  text: rows2.soal,
  footer: "\n\nPilih salah satu jawaban disini",
  title: `[ GAMES ( *${command}* ) ]`,
  buttonText: "BUKA",
  sections: [{ title: "Silahkan pilih salah satu jawaban disini", rows: rows}
]
})
}
if (q){ 
  Object.keys(games).forEach((i) => {
    if (games[i].soal == m.messages[0].message.listResponseMessage.contextInfo.quotedMessage.listMessage.description){
      if (games[i].jawaban !== q){ deleteMess()
        md.sendMessage(from, {sticker: {url: `https://github.com/naylachan/STICKER2/blob/main/lose${[1,2,3,4,5][Math.floor(Math.random() * [1,2,3,4,5].length)]}.webp?raw=true`}}, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "liveLocationMessage": { "caption": "Nice Try " + pushname } } } })       
        setTimeout( () => {
          md.sendMessage(from, { text: `Sayang sekali jawaban yang benar adalah ${games[i].jawaban}` },{ quoted: md1})        
        }, 1000)
      } else if (games[i].jawaban == q){ deleteMess()
        md.sendMessage(from, {sticker: {url: `https://github.com/naylachan/STICKER2/blob/main/win${[1,2,3,4,5][Math.floor(Math.random() * [1,2,3,4,5].length)]}.webp?raw=true`}}, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "liveLocationMessage": { "caption": "Congratulations " + pushname } } } })        
        setTimeout( () => {
          md.sendMessage(from, { text: "Benar!, Selamat kamu berhasil menjawab pertanyaan ini!" },{ quoted: md1})         
        }, 1000)
      }
    }
  })
}

} catch(e) { console.log(e) }
} 
