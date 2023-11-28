// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.quizz = mufar.quizz ? mufar.quizz : {}
    let id = m.chat
    if (!(id in mufar.quizz)) throw false
    let json = mufar.quizz[id][1]
    mufar.reply(m.chat, (json[0].hint).map((element, index) => `${index + 1}. ${element}`).join("\n"), m)
}
handler.command = /^quizzh$/i

handler.limit = true

export default handler