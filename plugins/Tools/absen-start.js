// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { usedPrefix, text }) => {
    mufar.absen = mufar.absen ? mufar.absen : {}
    let id = m.chat
    if (id in mufar.absen) {
        await mufar.reply(m.chat, `_*Masih ada absen di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`, m)
    }
    mufar.absen[id] = [
        await mufar.reply(m.chat, `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`, m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['tools']

handler.command = /^(start|mulai)absen$/i
handler.group = true
handler.admin = true
export default handler
