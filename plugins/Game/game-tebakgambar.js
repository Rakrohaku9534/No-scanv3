// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { tebakgambar } from '@bochilteam/scraper'
import {
    webp2png
} from '../../lib/webp2mp4.js'

let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakingambar = mufar.tebakingambar ? mufar.tebakingambar : {}
    let id = m.chat
    if (id in mufar.tebakingambar) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakingambar[id][0])
        throw false
    }
    let json = await tebakgambar()
    let caption = `*${command.toUpperCase()}*
Rangkailah Gambar Ini
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgam untuk bantuan
Bonus: ${poin} XP
    `.trim()
    let imgurl = await imageUrl(json.img)
    mufar.tebakingambar[id] = [
        await mufar.sendFile(m.chat, imgurl, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakingambar[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tebakingambar[id][0])
            delete mufar.tebakingambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

export default handler

async function imageUrl(url) {
  try {
    let Blobs = await(await fetch(url)).blob()
let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
  let pngBuffer = await webp2png(buffer);
  return pngBuffer
  } catch (error) {
    console.error("Error:", error);
  }
}

const buttons = [
    ['Hint', '/hgam'],
    ['Nyerah', 'menyerah']
]