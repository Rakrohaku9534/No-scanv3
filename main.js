process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import './config.js';

import {
    createRequire
} from "module";
import {
    join
} from 'path';
import path from 'path';
import {
    fileURLToPath,
    pathToFileURL
} from 'url';
import {
    platform
} from 'process';
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

import * as ws from 'ws';
import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    watch
} from 'fs';
import fs from 'fs/promises';
import yargs from 'yargs';
import {
    spawn
} from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import {
    tmpdir
} from 'os';
import chokidar from 'chokidar';
import {
    format,
    promisify
} from 'util';
import {
    Boom
} from "@hapi/boom";
import Pino from 'pino';
import {
    makeWaSocket,
    protoType,
    serialize
} from './lib/simple.js';
import {
    Low,
    JSONFile
} from 'lowdb';
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js';

const {
    DisconnectReason,
    useMultiFileAuthState,
    MessageRetryMap,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    proto,
    jidNormalizedUser,
    PHONENUMBER_MCC,
    Browsers
} = await (await import('@whiskeysockets/baileys')).default;

import readline from "readline"
import {
    parsePhoneNumber
} from "libphonenumber-js"

import single2multi from './lib/single2multi.js';
import storeSystem from './lib/store-multi.js';
import Helper from './lib/helper.js';
import emojiRegex from 'emoji-regex';

const pairingCode = true
const useMobile = process.argv.includes("--mobile")
const useQr = process.argv.includes("--qr")
const singleToMulti = process.argv.includes("--singleauth")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
import NodeCache from "node-cache"
const msgRetryCounterCache = new NodeCache()
const {
    CONNECTING
} = ws
const {
    chain
} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')
global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const symbolRegex = /^[^\w\s\d]/u;
const emojiAndSymbolRegex = new RegExp(`(${symbolRegex.source}|${emojiRegex().source})`, 'u');
global.prefix = emojiAndSymbolRegex;
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function() {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
        }
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}
loadDatabase()
global.authFile = `MufarSession`;

const msgRetryCounterMap = (MessageRetryMap) => {};
const {
    version
} = await fetchLatestBaileysVersion();

if (!pairingCode && !useMobile && !useQr && !singleToMulti) {
    const title = "OPTIONS";
    const message = "--pairing-code, --mobile, --qr, --singleauth";
    const boxWidth = 40;
    const horizontalLine = chalk.redBright("─".repeat(boxWidth));

    const formatText = (text, bgColor, textColor) => chalk[bgColor](chalk[textColor](text.padStart(boxWidth / 2 + text.length / 2).padEnd(boxWidth)));

    console.log(`╭${horizontalLine}╮
|${formatText(title, 'bgRed', 'white')}|
├${horizontalLine}┤
|${formatText(message, 'bgWhite', 'red')}|
╰${horizontalLine}╯`);
}

var authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}MufarSession`)
var authFile = `${Helper.opts._[0] || 'session'}.data.json`

var [
    isCredsExist,
    isAuthSingleFileExist,
    authState
] = await Promise.all([
    Helper.checkFileExists(authFolder + '/creds.json'),
    Helper.checkFileExists(authFile),
    storeSystem.useMultiFileAuthState(authFolder)
])

var store = storeSystem.makeInMemoryStore()

// Convert single auth to multi auth
if (Helper.opts['singleauth'] || Helper.opts['singleauthstate']) {
    if (!isCredsExist && isAuthSingleFileExist) {
        console.debug(chalk.blue('- singleauth -'), chalk.yellow('creds.json not found'), chalk.green('compiling singleauth to multiauth...'));
        await single2multi(authFile, authFolder, authState);
        console.debug(chalk.blue('- singleauth -'), chalk.green('compiled successfully'));
        authState = await storeSystem.useMultiFileAuthState(authFolder);
    } else if (!isAuthSingleFileExist) console.error(chalk.blue('- singleauth -'), chalk.red('singleauth file not found'));
}

var storeFile = `${Helper.opts._[0] || 'data'}.store.json`
store.readFromFile(storeFile)

const connectionOptions = {
    ...(!pairingCode && !useMobile && !useQr && {
        printQRInTerminal: false,
        mobile: !useMobile
    }),
    ...(pairingCode && {
        printQRInTerminal: !pairingCode
    }),
    ...(useMobile && {
        mobile: !useMobile
    }),
    ...(useQr && {
        printQRInTerminal: true
    }),
    patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
        if (requiresPatch) {
            message = {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadataVersion: 2,
                            deviceListMetadata: {}
                        },
                        ...message
                    }
                }
            };
        }
        return message;
    },
    msgRetryCounterMap,
    logger: Pino({
        level: 'fatal'
    }),
    auth: {
        creds: authState.state.creds,
        keys: makeCacheableSignalKeyStore(authState.state.keys, Pino().child({
            level: 'fatal',
            stream: 'store'
        })),
    },
    browser: ['Chrome (Linux)', '', ''],
    version,
    getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid)
        let msg = await store.loadMessage(jid, key.id)
        return msg?.message || ""
    },
    msgRetryCounterCache,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true
};

global.mufar = makeWaSocket(connectionOptions);
store.bind(mufar.ev)
mufar.isInit = false

if (pairingCode && !mufar.authState.creds.registered) {
    if (useMobile) mufar.logger.error('\nCannot use pairing code with mobile api')
    console.log(chalk.cyan('╭──────────────────────────────────────···'));
    console.log(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
    console.log(chalk.cyan('├──────────────────────────────────────···'));
    let phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
    console.log(chalk.cyan('╰──────────────────────────────────────···'));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.cyan('╭─────────────────────────────────────────────────···'));
        console.log(`💬 ${chalk.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
        console.log(chalk.cyan('╰─────────────────────────────────────────────────···'));
        console.log(chalk.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
        console.log(chalk.cyan('├──────────────────────────────────────···'));
        phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
        console.log(chalk.cyan('╰──────────────────────────────────────···'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    }
    let code = await mufar.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join("-") || code
    console.log(chalk.cyan('╭──────────────────────────────────────···'));
    console.log(` 💻 ${chalk.redBright('Your Pairing Code')}:`);
    console.log(chalk.cyan('├──────────────────────────────────────···'));
    console.log(`   ${chalk.cyan('- Code')}: ${code}`);
    console.log(chalk.cyan('╰──────────────────────────────────────···'));
    rl.close()
}

if (useMobile && !mufar.authState.creds.registered) {
    const {
        registration
    } = mufar.authState.creds || {
        registration: {}
    }
    if (!registration.phoneNumber) {
        console.log(chalk.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
        console.log(chalk.cyan('├──────────────────────────────────────···'));
        let phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
        console.log(chalk.cyan('╰──────────────────────────────────────···'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.cyan('╭─────────────────────────────────────────────────···'));
            console.log(`💬 ${chalk.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
            console.log(chalk.cyan('╰─────────────────────────────────────────────────···'));
            console.log(chalk.cyan('╭──────────────────────────────────────···'));
            console.log(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
            console.log(chalk.cyan('├──────────────────────────────────────···'));
            phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
            console.log(chalk.cyan('╰──────────────────────────────────────···'));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        }
        registration.phoneNumber = "+" + phoneNumber
    }

    const phoneNumber = parsePhoneNumber(registration.phoneNumber)
    if (!phoneNumber.isValid()) mufar.logger.error('\nInvalid phone number: ' + registration.phoneNumber)
    registration.phoneNumber = phoneNumber.format("E.164")
    registration.phoneNumberCountryCode = phoneNumber.countryCallingCode
    registration.phoneNumberNationalNumber = phoneNumber.nationalNumber
    const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode]
    registration.phoneNumberMobileCountryCode = mcc
    async function enterCode() {
        try {
            console.log(chalk.cyan('╭──────────────────────────────────────···'));
            console.log(`📨 ${chalk.redBright('Please Enter Your OTP Code')}:`);
            console.log(chalk.cyan('├──────────────────────────────────────···'));
            const code = await question(`   ${chalk.cyan('- Code')}: `);
            console.log(chalk.cyan('╰──────────────────────────────────────···'));
            const response = await mufar.register(code.replace(/[^0-9]/g, '').trim().toLowerCase())
            console.log(chalk.cyan('╭─────────────────────────────────────────────────···'));
            console.log(`💬 ${chalk.redBright("Successfully registered your phone number.")}`);
            console.log(chalk.cyan('╰─────────────────────────────────────────────────···'));
            console.log(response)
            rl.close()
        } catch (error) {
            mufar.logger.error('\nFailed to register your phone number. Please try again.\n', error)
            await askOTP()
        }
    }

    async function askOTP() {
        console.log(chalk.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.redBright('What method do you want to use? "sms" or "voice"')}`);
        console.log(chalk.cyan('├──────────────────────────────────────···'));
        let code = await question(`   ${chalk.cyan('- Method')}: `);
        console.log(chalk.cyan('╰──────────────────────────────────────···'));
        code = code.replace(/["']/g, '').trim().toLowerCase()
        if (code !== 'sms' && code !== 'voice') return await askOTP()
        registration.method = code
        try {
            await mufar.requestRegistrationCode(registration)
            await enterCode()
        } catch (error) {
            mufar.logger.error('\nFailed to request registration code. Please try again.\n', error)
            await askOTP()
        }
    }
    await askOTP()
}

mufar.logger.info('\n🚩 W A I T I N G\n');

if (!opts['test']) {
    if (global.db) {
        setInterval(async () => {
            if (global.db.data) await global.db.write();
            if (opts['autocleartmp'] && (global.support || {}).find)(tmp = [os.tmpdir(), 'tmp', 'jadibot'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
        }, 30 * 1000);
    }
}

if (opts['server'])(await import('./server.js')).default(global.mufar, PORT);

async function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, "./tmp")];
    const filename = [];
    tmp.forEach((dirname) =>
        readdirSync(dirname).forEach((file) => filename.push(join(dirname, file)))
    );
    return filename.map((file) => {
        const stats = statSync(file);
        if (
            filename.length >= 1 &&
            stats.isFile() &&
            Date.now() - stats.mtimeMs >= 1000 * 60 * 3
        ) {
            return unlinkSync(file); // 3 minutes
            console.log(chalk.cyanBright("Successfully clear tmp"));
        }
        return false;
    });
}

function clearSessions(folder = "MufarSession") {
    let filename = [];
    readdirSync(folder).forEach((file) => filename.push(join(folder, file)));
    return filename.map((file) => {
        let stats = statSync(file);
        if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 120) {
            // 1 hours
            console.log("Deleted sessions", file);
            return unlinkSync(file);
        }
        return false;
    });
}

function purgeSession() {
    let prekey = [];
    const directorio = readdirSync('./MufarSession');
    const filesFolderPreKeys = directorio.filter((file) => {
        return file.startsWith('pre-key-');
    });
    prekey = [...prekey, ...filesFolderPreKeys];
    filesFolderPreKeys.forEach((files) => {
        unlinkSync(`./MufarSession/${files}`);
    });
}

function purgeSessionSB() {
    const folderPath = './jadibot';
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
        mufar.logger.info('\nFolder jadibot berhasil dibuat.');
    }
    const listaDirectorios = readdirSync('./jadibot/');
    let SBprekey = [];
    listaDirectorios.forEach((filesInDir) => {
        const directorio = readdirSync(`./jadibot/${filesInDir}`);
        const DSBPreKeys = directorio.filter((fileInDir) => {
            return fileInDir.startsWith('pre-key-');
        });
        SBprekey = [...SBprekey, ...DSBPreKeys];
        DSBPreKeys.forEach((fileInDir) => {
            unlinkSync(`./jadibot/${filesInDir}/${fileInDir}`);
        });
    });
}

function purgeOldFiles() {
    const folderPath = './jadibot';
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
        mufar.logger.info('\nFolder jadibot berhasil dibuat.');
    }
    const directories = ['./MufarSession/', './jadibot/'];
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    directories.forEach((dir) => {
        readdirSync(dir, (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                const filePath = path.join(dir, file);
                stat(filePath, (err, stats) => {
                    if (err) throw err;
                    if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') {
                        unlinkSync(filePath, (err) => {
                            if (err) throw err;
                            mufar.logger.info(`\nBerkas ${file} berhasil dihapus`);
                        });
                    } else {
                        mufar.logger.warn(`\nBerkas ${file} tidak dihapus`);
                    }
                });
            });
        });
    });
}

async function connectionUpdate(update) {
    const {
        connection,
        lastDisconnect,
        isNewLogin,
        qr,
        isOnline,
        receivedPendingNotifications
    } = update;
    global.stopped = connection;
    if (isNewLogin) mufar.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut && mufar?.ws.socket == null) {
        mufar.logger.info(await global.reloadHandler(true).catch(console.error));
    }
    if (global.db.data == null) loadDatabase();
    if (!pairingCode && !useMobile && useQr && qr != 0 && qr != undefined) {
        mufar.logger.info(chalk.yellow('\n🚩ㅤPindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik.'));
    }
    if (connection === "connecting") {
        console.log(
            chalk.redBright("⚡ Mengaktifkan Bot, Mohon tunggu sebentar...")
        );
    }
    if (connection === "open") {
        const {
            jid,
            name
        } = mufar.user;
        const currentTime = new Date();
        const pingStart = new Date();
        const infoMsg = `*Bot Info:*
   
*Current Time:* ${currentTime}
*Name:* ${name || 'Taylor'}
*Tag:* @${jid.split('@')[0]}
*Ping Speed:* ${pingStart - new Date()}ms
*Date:* ${currentTime.toDateString()}
*Time:* ${currentTime.toLocaleTimeString()}
*Day:* ${currentTime.toLocaleDateString('id-ID', { weekday: 'long' })}
*Description:* Bot ${name || 'Taylor'} is now active.`;
       /* await mufar.sendMessage(nomorown + "@s.whatsapp.net", {
            text: infoMsg,
            mentions: [nomorown + "@s.whatsapp.net", jid]
        }, {
            quoted: null
        })*/
        mufar.logger.info(chalk.yellow('\n🚩 R E A D Y'));
    }
    if (isOnline == true) {
        mufar.logger.info(chalk.green("Status Aktif"));
    }
    if (isOnline == false) {
        mufar.logger.error(chalk.red("Status Mati"));
    }
    if (receivedPendingNotifications) {
        mufar.logger.warn(chalk.yellow("Menunggu Pesan Baru"));
    }
    if (connection == 'close') {
        mufar.logger.error(chalk.yellow(`\n🚩 Koneksi ditutup, harap hapus folder ${global.authFile} dan pindai ulang kode QR`));
    }
}

process.on("unhandledRejection", (reason, p) => {
    console.log(" [AntiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [AntiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", () => {
    null;
});

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (error) {
        console.error;
    }
    if (restatConn) {
        const oldChats = global.mufar.chats;
        try {
            global.mufar.ws.close();
        } catch {}
        mufar.ev.removeAllListeners();
        global.mufar = makeWaSocket(connectionOptions, {
            chats: oldChats
        });
        isInit = true;
    }
    if (!isInit) {
        mufar.ev.off('messages.upsert', mufar.handler);
        mufar.ev.off('messages.update', mufar.pollUpdate);
        mufar.ev.off('group-participants.update', mufar.participantsUpdate);
       //mufar.ev.off('groups.update', mufar.groupsUpdate);
        mufar.ev.off('message.delete', mufar.onDelete);
        mufar.ev.off("presence.update", mufar.presenceUpdate);
        mufar.ev.off('connection.update', mufar.connectionUpdate);
        mufar.ev.off('creds.update', mufar.credsUpdate);
    }

    const emoji = {
        welcome: '👋',
        bye: '👋',
        promote: '👤👑',
        demote: '👤🙅‍♂️',
        desc: '📝',
        subject: '📌',
        icon: '🖼️',
        revoke: '🔗',
        announceOn: '🔒',
        announceOff: '🔓',
        restrictOn: '🚫',
        restrictOff: '✅',
    };

    mufar.welcome = `${emoji.welcome} Hallo @user\n\n   *W E L C O M E*\n⫹⫺ Di grup @subject\n\n⫹⫺`;
    mufar.bye = `   *G O O D B Y E*\n${emoji.bye} Sampai jumpa @user`;
    mufar.spromote = `*${emoji.promote} @user* sekarang menjadi admin!`;
    mufar.sdemote = `*${emoji.demote} @user* tidak lagi menjadi admin!`;
    mufar.sDesc = `${emoji.desc} Deskripsi telah diubah menjadi:\n@desc`;
    mufar.sSubject = `${emoji.subject} Judul grup telah diubah menjadi:\n@subject`;
    mufar.sIcon = `${emoji.icon} Icon grup telah diubah!`;
    mufar.sRevoke = `${emoji.revoke} Link grup telah diubah ke:\n@revoke`;
    mufar.sAnnounceOn = `${emoji.announceOn} Grup telah ditutup!\nSekarang hanya admin yang dapat mengirim pesan.`;
    mufar.sAnnounceOff = `${emoji.announceOff} Grup telah dibuka!\nSekarang semua peserta dapat mengirim pesan.`;
    mufar.sRestrictOn = `${emoji.restrictOn} Edit Info Grup diubah ke hanya admin!`;
    mufar.sRestrictOff = `${emoji.restrictOff} Edit Info Grup diubah ke semua peserta!`;

    mufar.handler = handler.handler.bind(global.mufar);
    mufar.pollUpdate = handler.pollUpdate.bind(global.mufar);
    mufar.participantsUpdate = handler.participantsUpdate.bind(global.mufar);
    mufar.groupsUpdate = handler.groupsUpdate.bind(global.mufar);
    mufar.onDelete = handler.deleteUpdate.bind(global.mufar);
    mufar.presenceUpdate = handler.presenceUpdate.bind(global.mufar);
    mufar.connectionUpdate = connectionUpdate.bind(global.mufar);
    mufar.credsUpdate = authState.saveCreds.bind(global.mufar, true);

    const currentDateTime = new Date();
    const messageDateTime = new Date(mufar.ev);
    if (currentDateTime >= messageDateTime) {
        const chats = Object.entries(mufar.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    } else {
        const chats = Object.entries(mufar.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    }

    mufar.ev.on('messages.upsert', mufar.handler);
    mufar.ev.on("messages.update", mufar.pollUpdate);
    mufar.ev.on('group-participants.update', mufar.participantsUpdate);
    //mufar.ev.on('groups.update', mufar.groupsUpdate);
    mufar.ev.on('message.delete', mufar.onDelete);
    mufar.ev.on("presence.update", mufar.presenceUpdate);
    mufar.ev.on('connection.update', mufar.connectionUpdate);
    mufar.ev.on('creds.update', mufar.credsUpdate);
    
    isInit = false;
    return true;
};

global.plugins = {};
const pluginFilter = (filename) => /\.js$/.test(filename);

const require = createRequire(import.meta.url);
const glob = require('glob');

async function filesInit() {
    try {
        const pluginsDirectory = path.join(__dirname, 'plugins');
        const pattern = path.join(pluginsDirectory, '**/*.js');
        const CommandsFiles = getJSFiles(pattern);
        const successMessages = [];
        const errorMessages = [];

        for (let file of CommandsFiles) {
            const moduleName = '/' + path.relative(__dirname, file);
            try {
                const module = await import(file);
                global.plugins[moduleName] = module.default || module;
                successMessages.push(moduleName);
            } catch (e) {
                mufar.logger.error(e);
                delete global.plugins[moduleName];
                errorMessages.push(moduleName);
            }
        }

        await mufar.sendMessage(nomorown + "@s.whatsapp.net", {
            text: "*Loaded Plugins Report:*\n" +
                "\n*Total Plugins:* " + CommandsFiles.length +
                "\n*Success:* " + successMessages.length +
                "\n*Error:* " + errorMessages.length +
                "\n*Error List:*\n" + errorMessages.map((v, i) => (i + 1) + ". " + v).join('\n')
        }, {
            quoted: null
        });

        mufar.logger.warn("Loaded " + CommandsFiles.length + " JS Files total.");
        mufar.logger.info("✅ Success Plugins:\n" + successMessages.length + " total.");
        mufar.logger.error("❌ Error Plugins:\n" + errorMessages.length + " total");
    } catch (e) {
        mufar.logger.error(e);
    }
}

filesInit()
    .catch(console.error);

function getJSFiles(pattern) {
    return glob.sync(pattern);
}

function FileEv(type, file) {
    const filename = async (file) => file.replace(/^.*[\\\/]/, "");
    console.log(file);
    switch (type) {
        case "delete":
            return delete global.plugins[file];
            break;
        case "change":
            try {
                (async () => {
                    const module = await import(
                        `${global.__filename(file)}?update=${Date.now()}`
                    );
                    global.plugins[file] = module.default || module;
                })();
            } catch (e) {
                mufar.logger.error(
                    `error require plugin '${filename(file)}\n${format(e)}'`
                );
            } finally {
                global.plugins = Object.fromEntries(
                    Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
                );
            }
            break;
        case "add":
            try {
                (async () => {
                    const module = await import(
                        `${global.__filename(file)}?update=${Date.now()}`
                    );
                    global.plugins[file] = module.default || module;
                })();
            } catch (e) {
                mufar.logger.error(
                    `error require plugin '${filename(file)}\n${format(e)}'`
                );
            } finally {
                global.plugins = Object.fromEntries(
                    Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
                );
            }
            break;
    }
}

function watchFiles() {
    let watcher = chokidar.watch("plugins/**/*.js", {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        ignoreInitial: true,
        alwaysState: true,
    });
    const pluginFilter = (filename) => /\.js$/.test(filename);
    watcher
        .on("add", (path) => {
            mufar.logger.info(`new plugin - '${path}'`);
            return FileEv("add", `./${path}`);
        })
        .on("change", (path) => {
            mufar.logger.info(`updated plugin - '${path}'`);
            return FileEv("change", `./${path}`);
        })
        .on("unlink", (path) => {
            mufar.logger.warn(`deleted plugin - '${path}'`);
            return FileEv("delete", `./${path}`);
        });
}
watchFiles();
await global.reloadHandler();
async function _quickTest() {
    const test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version']),
    ].map((p) => {
        return Promise.race([
            new Promise((resolve) => {
                p.on('close', (code) => {
                    resolve(code !== 127);
                });
            }),
            new Promise((resolve) => {
                p.on('error', (_) => resolve(false));
            })
        ]);
    }));
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    const s = global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
    };
    Object.freeze(global.support);
}
const actions = [{
        func: clearTmp,
        message: '\nPenyegaran Tempat Penyimpanan Berhasil ✅'
    },
    {
        func: purgeSession,
        message: '\nSesi-Sesi Tersimpan Sudah Dihapus ✅'
    },
    {
        func: purgeSessionSB,
        message: '\nSesi-Sesi Sub-Bot Telah Dihapus ✅'
    },
    {
        func: purgeOldFiles,
        message: '\nBerkas Lama Telah Dihapus ✅'
    }
];

for (const action of actions) {
    setInterval(async () => {
        if (stopped === 'close' || !mufar || !mufar.user) return;
        await action.func();
        console.log(chalk.cyanBright(
            `\n╭───────────────────────────────────···\n│\n` +
            `│  ${action.message}\n│\n` +
            `╰───────────────────────────────────···\n`
        ));
    }, 60 * 60 * 1000);
}

function clockString(ms) {
    if (isNaN(ms)) return '-- Hari -- Jam -- Menit -- Detik';
    const units = [{
            label: 'Hari',
            value: Math.floor(ms / 86400000)
        },
        {
            label: 'Jam',
            value: Math.floor(ms / 3600000) % 24
        },
        {
            label: 'Menit',
            value: Math.floor(ms / 60000) % 60
        },
        {
            label: 'Detik',
            value: Math.floor(ms / 1000) % 60
        }
    ];
    return units.map(unit => `${unit.value.toString().padStart(2, '0')} ${unit.label}`).join(' ');
}

_quickTest().catch(console.error);