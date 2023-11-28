// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    let q = m.quoted;
    if (q && q.message) {
        let type = Object.keys(q.message)[0];
        if (q.message[type]?.viewOnce) {
            try {
                let txt = q.message[type].caption || '';
                let buffer = await q.download();
                if (/audio/.test(type)) {
                    await mufar.sendMessage(m.chat, { audio: buffer, ptt: true }, { quoted: m });
                } else {
                    await mufar.sendFile(m.chat, buffer, '', txt, null, false, { mentions: mufar.parseMention(txt), quoted: m });
                }
            } catch (e) {
                console.log(e);
                throw 'Telah dibuka sebelumnya atau kesalahan lain.';
            }
        } else {
            throw 'Itu bukan pesan viewOnce';
        }
    } else {
        throw 'Tidak ada pesan yang dapat diakses';
    }
};

handler.help = ['readviewonce'];
handler.tags = ['tools'];
handler.command = /^((read)?viewonce|rvo)$/i;

export default handler;