// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.tebaktebakan = mufar.tebaktebakan ? mufar.tebaktebakan : {}
    let id = m.chat
    if (id in mufar.tebaktebakan) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebaktebakan[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
  ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hteb untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebaktebakan[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebaktebakan[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tebaktebakan[id][0])
            delete mufar.tebaktebakan[id]
        }, timeout)
    ]
}
handler.help = ['tebaktebakan']
handler.tags = ['game']
handler.command = /^tebaktebakan/i

export default handler

const buttons = [
    ['Hint', '/hteb'],
    ['Nyerah', 'menyerah']
]