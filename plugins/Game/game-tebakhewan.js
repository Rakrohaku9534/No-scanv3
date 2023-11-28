// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch';
import cheerio from 'cheerio';
import path from 'path';

let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakhewan = mufar.tebakhewan ? mufar.tebakhewan : {}
    let id = m.chat
    if (id in mufar.tebakhewan) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakhewan[id][0])
        throw false
    }
    
  let src = await tebakHewan()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
hewan apakah ini?
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hhew untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakhewan[id] = [
        await mufar.sendFile(m.chat, json.url, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakhewan[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, mufar.tebakhewan[id][0])
            delete mufar.tebakhewan[id]
        }, timeout)
    ]
}
handler.help = ['tebakhewan']
handler.tags = ['game']
handler.command = /^tebakhewan/i

export default handler

const buttons = [
    ['Hint', '/hhew'],
    ['Nyerah', 'menyerah']
]

async function tebakHewan() {
const randomPageNumber = Math.floor(Math.random() * 20) + 1;
const url = `https://rimbakita.com/daftar-nama-hewan-lengkap/${randomPageNumber}/`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $('div.entry-content.entry-content-single img[class*=wp-image-][data-src]').map((_, element) => {
      const src = $(element).attr('data-src');
      const alt = path.basename(src, path.extname(src)).replace(/-/g, ' ');
      const capitalizedAlt = alt.charAt(0).toUpperCase() + alt.slice(1);
      return { title: capitalizedAlt, url: src };
    }).get();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};