// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import {
    Aki
} from 'aki-api';

let handler = async (m, {
    mufar,
    usedPrefix,
    command,
    text
}) => {
    mufar.akinatorv2 = mufar.akinatorv2 || {};
    if (text == 'end') {
        if (!mufar.akinatorv2[m.sender]) return m.reply('Anda tidak sedang dalam sesi Akinator')
        delete mufar.akinatorv2[m.sender]
        m.reply('Berhasil keluar dari sesi Akinator.')
    } else if (text == 'start') {
        if (mufar.akinatorv2[m.sender]) return mufar.reply(m.chat, 'Anda masih berada dalam sesi Akinator', mufar.akinatorv2[m.sender].msg)
        try {
            mufar.akinatorv2[m.sender] = new Aki({
                region: 'id',
                childMode: false,
                proxy: undefined
            });
            await mufar.akinatorv2[m.sender].start();

            let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n${mufar.akinatorv2[m.sender].question}\n\n`
            txt += '0 - Ya\n'
            txt += '1 - Tidak\n'
            txt += '2 - Saya Tidak Tau\n'
            txt += '3 - Mungkin\n'
            txt += '4 - Mungkin Tidak\n\n'
            txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`
            let soal = await mufar.sendMessage(m.chat, {
                text: txt,
                mentions: [m.sender]
            }, {
                quoted: m
            })
            mufar.akinatorv2[m.sender].msg = soal
        } catch (e) {
            console.log(e)
            await m.reply(eror)
        }
    } else {
        m.reply('Contoh: .akinatorv2 start/end')
    }
}

handler.menu = ['akinatorv2']
handler.tags = ['game']
handler.command = /^(akinatorv2)$/i

handler.limit = true

export default handler