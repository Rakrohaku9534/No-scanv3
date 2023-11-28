// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()
    mufar.tekateki = mufar.tekateki ? mufar.tekateki : {}
    let id = m.chat
    if (id in mufar.tekateki) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tekateki[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}htek untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tekateki[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tekateki[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tekateki[id][0])
            delete mufar.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i

export default handler

const buttons = [
    ['Hint', '/htek'],
    ['Nyerah', 'menyerahtek']
]