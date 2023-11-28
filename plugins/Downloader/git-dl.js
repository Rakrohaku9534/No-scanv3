// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'

let handler = async (m, { mufar, args }) => {
	let regex = /(?:https?|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
	if (!args[0]) throw 'Ex: https://github.com/Nurutomo/wabot-aq'
	if (!regex.test(args[0])) throw 'Invalid URL'
	let [, user, repo] = args[0].match(regex) || []
	repo = repo.replace(/.git$/, '')
	let url = `https://api.github.com/repos/${user}/${repo}/zipball`
	let res = await fetch(url, { method: 'head' })
	if (res.status !== 200) throw res.statusText
	let fileName = res.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
	let mimetype = res.headers.get('content-type')
	await await m.reply(`Sedang diproses...`)
	mufar.sendMessage(m.chat, { document: { url }, fileName, mimetype }, { quoted: m })
}
handler.help = handler.alias = ['gitdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(gitdl)$/
export default handler