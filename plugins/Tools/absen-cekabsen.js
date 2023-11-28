// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja


let handler = async (m, { mufar, usedPrefix }) => {
    let id = m.chat
    mufar.absen = mufar.absen ? mufar.absen : {}
    if (!(id in mufar.absen)) await mufar.reply(m.chat, `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, m)
            
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = mufar.absen[id][1]
    let list = absen.map((v, i) => `${dmenub} ${i + 1}.  @${v.split`@`[0]}`).join('\n')
            let caption = `*${htjava} TANGGAL ${htjava}*\n${date}
${mufar.absen[id][2]}

*${htjava} SUDAH ABSEN ${htjava}*
*Total:* ${absen.length}

${dmenut}
${list}
${dmenuf}
`

await mufar.reply(m.chat, caption, m, { mentions: mufar.parseMention(caption) })

}
handler.help = ['cekabsen']
handler.tags = ['tools']

handler.command = /^cekabsen$/i
handler.group = true
export default handler
