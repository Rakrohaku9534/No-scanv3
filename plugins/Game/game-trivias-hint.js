// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'

let handler = async (m, { mufar }) => {
    mufar.trivias = mufar.trivias ? mufar.trivias : {}
    let id = m.chat
    if (!(id in mufar.trivias)) throw false
    let json = mufar.trivias[id][1]
    let jawaban = await Tr(json.correctAnswer)
    mufar.reply(m.chat, '```' + jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^htri$/i
handler.limit = true

export default handler

async function Tr(teks) {
let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + teks)
	let res = await reis.json()
	return res[0][0][0]
}