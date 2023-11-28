// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
import { siapakahaku } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.siapakahaku = mufar.siapakahaku ? mufar.siapakahaku : {}
    let id = m.chat
    if (id in mufar.siapakahaku) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.siapakahaku[id][0])
        throw false
    }
    const json = await siapakahaku()
    let caption = `*${command.toUpperCase()}*
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsi untuk bantuan
Bonus: ${poin} XP
`.trim()
    mufar.siapakahaku[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.siapakahaku[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.siapakahaku[id][0])
            delete mufar.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapakahaku/i

export default handler

const buttons = [
    ['Hint', '/hsi'],
    ['Nyerah', 'menyerah']
]