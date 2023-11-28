// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.lengkapikalimat = mufar.lengkapikalimat ? mufar.lengkapikalimat : {}
    let id = m.chat
    if (!(id in mufar.lengkapikalimat)) throw false
    let json = mufar.lengkapikalimat[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hlen$/i

handler.limit = true

export default handler