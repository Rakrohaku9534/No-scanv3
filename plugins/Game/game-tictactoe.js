// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import TicTacToe from '../../lib/tictactoe.js'

let handler = async (m, { mufar, usedPrefix, command, text }) => {
    mufar.game = mufar.game ? mufar.game : {}
    if (Object.values(mufar.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw 'Kamu masih didalam game'
    let room = Object.values(mufar.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    // m.reply('[WIP Feature]')
    if (room) {
        m.reply('Partner ditemukan!')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'
        let arr = room.game.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
Menunggu @${room.game.currentTurn.split('@')[0]}
Ketik *nyerah* untuk nyerah
`.trim()
        if (room.x !== room.o) await mufar.reply(room.x, str, m, {
            mentions: mufar.parseMention(str)
        })
        await mufar.reply(room.o, str, m, {
            mentions: mufar.parseMention(str)
        })
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        /*
        if (text) room.name = text
        m.reply('Menunggu partner' + (text ? ` mengetik command dibawah ini
${usedPrefix}${command} ${text}` : ''))
*/
        if (text) room.name = text
        let str = 'Menunggu partner' + (text ? ` mengetik command dibawah ini
${usedPrefix}${command} ${text}` : '')
        await mufar.reply(room.x, str, m, {
            mentions: mufar.parseMention(str)
        })


        mufar.game[room.id] = room
    }
}

handler.help = ['tictactoe', 'ttt'].map(v => v + ' [custom room name]')
handler.tags = ['game']
handler.command = /^(tictactoe|t{3})$/

export default handler