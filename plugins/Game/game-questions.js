// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, text, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.question = mufar.question ? mufar.question : {}
    let id = m.chat
    if (!text)
      return m.reply(
        `Please use this command like this: ${usedPrefix}question easy/medium/hard`
      );
    if (id in mufar.question) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.question[id][0])
        throw false
    }
    let src = await (await fetch("https://opentdb.com/api.php?amount=1&difficulty=" + text + "&type=multiple")).json()
  let json = src
  let caption = `            *『  Question Answers  』*\n\n🎀  *Category:* ${json.results[0].category}\n❄  *Difficulty:* ${json.results[0].difficulty}\n\n📒  *Question:* ${json.results[0].question}
  
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hasa untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.question[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.question[id]) mufar.reply(m.chat, `Waktu habis!\\n\n🎋  *Answer:* ${json.results[0].correct_answer}\n
`, mufar.question[id][0])
            delete mufar.question[id]
        }, timeout)
    ]
}
handler.help = ['question']
handler.tags = ['game']
handler.command = /^question$/i;

export default handler

const buttons = [
    ['Hint', '/hasa'],
    ['Nyerah', 'menyerah']
]