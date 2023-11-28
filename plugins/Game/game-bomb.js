// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, {
    mufar
}) => {
    mufar.bomb = mufar.bomb || {};
    let id = m.chat,
        timeout = 180000;
    if (id in mufar.bomb) return mufar.reply(m.chat, '*^ sesi ini belum selesai!*', mufar.bomb[id][0]);
    const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
    const number = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    const array = bom.map((v, i) => ({
        emot: v,
        number: number[i],
        position: i + 1,
        state: false
    }));
    let teks = `乂  *B O M B*\n\nKirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
    for (let i = 0; i < array.length; i += 3) teks += array.slice(i, i + 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
    teks += `\nTimeout : [ *${((timeout / 1000) / 60)} menit* ]\nApabila mendapat kotak yang berisi bom maka point akan di kurangi.`;
    let msg = await mufar.reply(m.chat, teks, m);
    let { key } = msg

    let v;
    mufar.bomb[id] = [
        msg,
        array,
        setTimeout(() => {
            v = array.find(v => v.emot == '💥');
            if (mufar.bomb[id]) mufar.reply(m.chat, `*Waktu habis!*, Bom berada di kotak nomor ${v.number}.`, mufar.bomb[id][0].key);
            delete mufar.bomb[id];
        }, timeout),
        key
    ];

};

handler.help = ["bomb"];
handler.tags = ["game"];
handler.command = /^(bomb)$/i;

export default handler;