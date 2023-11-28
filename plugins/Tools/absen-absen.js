// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja


let handler = async (m, { mufar, usedPrefix }) => {
    let id = m.chat
    mufar.absen = mufar.absen ? mufar.absen : {}
    if (!(id in mufar.absen)) {
        await mufar.reply(m.chat, `Tidak ada absen berlangsung!`, m)
        throw false
    }
    let absen = mufar.absen[id][1]
    if (absen.includes(m.sender)) throw 'Kamu sudah absen!'
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    
    let list = absen.map((v, i) => `${dmenub} ${i + 1}.  @${v.split`@`[0]}`).join('\n')
            let caption = `*${htjava} TANGGAL ${htjava}*\n${date}
${mufar.absen[id][2]}

*${htjava} DAFTAR ABSEN ${htjava}*
*Total:* ${absen.length}

${dmenut}
${list}
${dmenuf}
`
await mufar.reply(m.chat, caption, m, { mentions: mufar.parseMention(caption) })


}
handler.help = ['absen']
handler.tags = ['tools']

handler.command = /^(absen|hadir)$/i

export default handler
