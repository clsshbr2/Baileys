/**
 * EXEMPLO SIMPLES - Bot WhatsApp com Baileys
 * 
 * Este é um exemplo básico para começar rapidamente
 * com a biblioteca Baileys
 */

import makeWASocket, { DisconnectReason, useMultiFileAuthState } from './lib/index.js';

import qrcode from 'qrcode-terminal';

async function criarBot() {
    // Gerencia autenticação (salva credenciais automaticamente)
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_bot');

    // Cria conexão WhatsApp
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false  // Mostra QR code no terminal
    });

    // Salva credenciais quando mudarem
    sock.ev.on('creds.update', saveCreds);

    // Monitora status da conexão
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if(qr){
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect?.error && lastDisconnect.error.output?.statusCode) !== DisconnectReason.loggedOut;


            console.log('Conexão fechada. Reconectando:', shouldReconnect);
            if (shouldReconnect) criarBot(); // Reconecta
        }
        else if (connection === 'open') {
            console.log('🚀 Bot conectado com sucesso!');
        }
    });

    // Escuta mensagens recebidas
    sock.ev.on('messages.upsert', async (m) => {
        const mensagem = m.messages[0];
        if(mensagem.key.remoteJid === 'status@broadcast' || !mensagem.key || mensagem.key.remoteJid.includes('@g.us')) return;

        // Ignora mensagens próprias e de status
        if (mensagem.key.fromMe || !mensagem.message) return;

        const remetente = mensagem.key.remoteJid;
        const texto = mensagem.message.conversation ||
            mensagem.message.extendedTextMessage?.text || '';

        console.log(`💬 Nova mensagem de ${remetente}: ${texto}`);

        // Respostas automáticas simples
        if (texto.toLowerCase() === 'asdasdas') {
            await sock.sendMessage(remetente, { text: '👋 Olá! Como você está?' });
        }

        if (texto.toLowerCase() === 'horaa') {
            const agora = new Date().toLocaleString('pt-BR');
            await sock.sendMessage(remetente, { text: `🕐 São ${agora}` });
        }

        if (texto.toLowerCase() === 'ajudaa') {
            await sock.sendMessage(remetente, {
                text: '🆘 *Comandos disponíveis:*\n\n' +
                    '• oi - Saudação\n' +
                    '• hora - Hora atual\n' +
                    '• ajuda - Esta mensagem'
            });
        }
    });

    return sock;
}

// Para usar código de pareamento (opcional)
async function conectarComCodigo() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_bot');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false // Desabilita QR para usar código
    });

    // Se não estiver registrado, solicita código
    if (!sock.authState.creds.registered) {
        const numeroTelefone = '5511999999999'; // SEU NÚMERO AQUI
        const codigo = await sock.requestPairingCode(numeroTelefone);
        console.log(`📱 Código de pareamento: ${codigo}`);
    }

    // Resto das configurações igual ao exemplo acima...
    sock.ev.on('creds.update', saveCreds);
    // ... adicione outros event listeners aqui

    return sock;
}

// Inicia o bot
console.log('🤖 Iniciando bot WhatsApp...');
criarBot().catch(console.error);