// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from "node-fetch"

let handler = async (m, { mufar, isOwner, usedPrefix, command, args }) => {
	let query = "input text Ex:\n.midjourney man kissing"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	try {
	m.reply(wait)
	 await Draw(text).then((img) => {
                mufar.sendFile(m.chat, img, text, "*[ Result ]*\n" + text, m)
            })
      } catch (e) {
      throw eror
   }
            
}

handler.help = ["midjourney"]
handler.tags = ["ai"]
handler.command = /^midjourney$/i

export default handler

async function Draw(propmt) {
    const Blobs = await fetch(
  "https://api-inference.huggingface.co/models/prompthero/openjourney-v2",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({ inputs: propmt }),
  }
)
  .then((res) => res.blob())
    const arrayBuffer = await Blobs.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer
}
