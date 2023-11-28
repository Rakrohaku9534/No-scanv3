// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'

let handler = async (m, { mufar, command, text }) => {
let imgr = flaaa.getRandom()
    if (/help/.test(text)) return m.reply(`
┌「 *Sambung Kata* 」
├ Sambung Kata adalah
│ permainan yang dimana setiap
│ pemainnya diharuskan membuat
│ kata dari akhir kata yang
│ berasal dari kata sebelumnya.
└────
┌「 *Peraturan* 」
├ Jawaban kata tidak mengandung
│ spasi dan imbuhan (me-, -an, dll).
├ .skata
│ untuk memulai
├ ketik *nyerah*
│ untuk menyerah
├ berhasil menjawab
│ mendapatkan 100 XP
└────`.trim())
    mufar.skata = mufar.skata ? mufar.skata : {}
    let id = m.chat
    if (!text) return m.reply("input kata awal")
    let res = await fetch('https://api.lolhuman.xyz/api/sambungkata?apikey=' + global.lolkey + '&text=' + text)
    let json = await res.json()
    if (id in mufar.skata) return mufar.reply(m.chat, `^ soal ini belum terjawab!`, mufar.skata[id][0])
    let kata = json.result
    mufar.skata[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', '*Mulai dari kata:* ' + kata.toUpperCase() + '\n\n*Awalan:* ' + (kata.toUpperCase().slice(-1)).toUpperCase() + '... ?\n\n*balas pesan ini untuk menjawab!*', m),
        kata.toLowerCase(),
        []
    ]
}
handler.help = ['sambungkata [help]']
handler.tags = ['game']
handler.command = /^s(ambung)?kata$/i

handler.limit = true

export default handler