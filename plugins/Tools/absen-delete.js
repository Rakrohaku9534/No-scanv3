// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar, usedPrefix }) => {
    let id = m.chat
    mufar.absen = mufar.absen ? mufar.absen : {}
    if (!(id in mufar.absen)) await mufar.reply(m.chat, `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, m)
    delete mufar.absen[id]
    m.reply(`Berhasil!`)
}
handler.help = ['hapusabsen']
handler.tags = ['tools']

handler.command = /^(delete|hapus)absen$/i
handler.group = true
handler.admin = true
export default handler
