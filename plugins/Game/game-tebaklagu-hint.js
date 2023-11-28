// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaklagu = mufar.tebaklagu ? mufar.tebaklagu : {}
    let id = m.chat
    if (!(id in mufar.tebaklagu)) throw false
    let json = mufar.tebaklagu[id][1]
    mufar.reply(m.chat, '```' + json.judul.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hlag$/i

handler.limit = true

export default handler