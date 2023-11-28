// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.lengkapikalimat = mufar.lengkapikalimat ? mufar.lengkapikalimat : {}
    let id = m.chat
    if (id in mufar.lengkapikalimat) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.lengkapikalimat[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
  ${json.pertanyaan}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlen untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.lengkapikalimat[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.lengkapikalimat[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.lengkapikalimat[id][0])
            delete mufar.lengkapikalimat[id]
        }, timeout)
    ]
}
handler.help = ['lengkapikalimat']
handler.tags = ['game']
handler.command = /^lengkapikalimat/i

export default handler

const buttons = [
    ['Hint', '/hlen'],
    ['Nyerah', 'menyerah']
]