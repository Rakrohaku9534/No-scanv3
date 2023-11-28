// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.susunkata = mufar.susunkata ? mufar.susunkata : {}
    let id = m.chat
    if (id in mufar.susunkata) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.susunkata[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
  ${json.soal}
  ${json.tipe}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsus untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.susunkata[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.susunkata[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.susunkata[id][0])
            delete mufar.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i

export default handler

const buttons = [
    ['Hint', '/hsus'],
    ['Nyerah', 'menyerah']
]