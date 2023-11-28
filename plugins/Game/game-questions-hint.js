// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.question = mufar.question ? mufar.question : {}
    let id = m.chat
    if (!(id in mufar.question)) throw false
    let json = mufar.question[id][1]
    mufar.reply(m.chat, '```' + json.results[0].correct_answer.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^quest$/i

handler.limit = true

export default handler