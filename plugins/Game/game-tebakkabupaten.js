// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import cheerio from 'cheerio';
import fetch from 'node-fetch';

let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakkabupaten = mufar.tebakkabupaten ? mufar.tebakkabupaten : {}
    let id = m.chat
    if (id in mufar.tebakkabupaten) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakkabupaten[id][0])
        throw false
    }
    
  let json = await getRandomKabupaten()
  let caption = `*${command.toUpperCase()}*
Kabupaten apakah ini?
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hkab untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakkabupaten[id] = [
        await mufar.sendFile(m.chat, json.url, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakkabupaten[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, mufar.tebakkabupaten[id][0])
            delete mufar.tebakkabupaten[id]
        }, timeout)
    ]
}
handler.help = ['tebakkabupaten']
handler.tags = ['game']
handler.command = /^tebakkabupaten/i

export default handler

const buttons = [
    ['Hint', '/hkab'],
    ['Nyerah', 'menyerah']
]

const baseUrl = 'https://id.m.wikipedia.org';
async function getRandomKabupaten() {
  try {
    const response = await fetch(baseUrl + '/wiki/Daftar_kabupaten_di_Indonesia');
    const html = await response.text();
    const $ = cheerio.load(html);

    const kabupatenList = $('td a[href^="/wiki/Kabupaten"]').map((index, element) => ({
      link: baseUrl + $(element).attr('href'),
      name: $(element).attr('title')
    })).get().filter(item => item.link && item.name);

    if (kabupatenList.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * kabupatenList.length);
    const randomKabupaten = kabupatenList[randomIndex];

    const imageUrl = await fetchImageUrl(randomKabupaten.link);
    const judul = randomKabupaten.name;
    const judulBaru = judul.replace('Kabupaten ', '');
    const linkGambar = imageUrl;
    const ukuranBaru = linkGambar.replace(/\/\d+px-/, '/1080px-');

    return {
      link: randomKabupaten.link,
      title: judulBaru,
      url: ukuranBaru
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchImageUrl(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return 'https:' + $('tr.mergedtoprow td.infobox-full-data.maptable div.ib-settlement-cols-row div.ib-settlement-cols-cell a.mw-file-description img.mw-file-element').attr('src') || null;
  } catch (error) {
    return null;
  }
}