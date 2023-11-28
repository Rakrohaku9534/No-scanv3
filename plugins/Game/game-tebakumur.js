// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

/**
* cuma mau bilang terimakasih ama https://github.com/uhdahlah
**/


import axios from "axios"
let handler = async(m, { mufar, text }) => {

    if (!text) return mufar.reply(m.chat, 'Masukan Teksnya', m)

    await m.reply('Searching...')
	axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=${global.lolkey}&name=${text}`).then ((res) => {
	 	let hasil = `Namamu : ${text}\nUmurmu : ${res.data.result.age}`

    mufar.reply(m.chat, hasil, m)
	})
}
handler.help = ['tebakumur'].map(v => v + ' <nama>')
handler.tags = ['internet', 'fun']
handler.command = /^(tebakumur)$/i
handler.owner = false
handler.exp = 0
handler.limit = true
// https://github.com/uhdahlah
export default handler
