// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'

let handler = async (m, { mufar, command }) => {

let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()

let nek = ne.split('\n')

let neko = await nek[Math.floor(Math.random() * nek.length)]

if (neko == '') throw 'Error'

mufar.sendFile(m.chat, neko, 'error.jpg', `Nyaww~ 🐾💗`, m)}


handler.command = /^(neko)$/i

handler.tags = ['anime']

handler.help = ['neko']

export default handler