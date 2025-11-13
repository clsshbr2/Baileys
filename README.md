# 🚀 Baileys - WhatsApp Web API

<div align="center">

![Baileys](https://img.shields.io/badge/Baileys-7.0.0--rc.6-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-16+-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

*Uma biblioteca WebSocket moderna para interagir com o WhatsApp Web*

[📖 Documentação](#-documentação) • [🚀 Instalação](#-instalação) • [💡 Exemplo Rápido](#-exemplo-rápido) • [🔥 Recursos](#-recursos)

</div>

---

## 🌟 Sobre o Projeto

Baileys é uma biblioteca TypeScript/JavaScript que permite conectar-se ao WhatsApp Web através de WebSockets, oferecendo uma API completa para automação e integração com WhatsApp.

### ✨ Por que usar Baileys?

- 🔥 **Ultra-rápido**: Conexão direta via WebSockets
- 🛡️ **Seguro**: Criptografia end-to-end mantida
- 📱 **Completo**: Suporte total às funcionalidades do WhatsApp
- 🔧 **TypeScript**: Totalmente tipado
- 🚀 **Moderno**: ES Modules e tecnologias atuais

---

## 🚀 Instalação

```bash
# NPM
npm install baileys

# Yarn
yarn add baileys

# PNPM
pnpm add baileys
```

### 📋 Pré-requisitos

- **Node.js** 20.x ou superior
- **NPM/Yarn/PNPM** para gerenciamento de pacotes

---

## 💡 Exemplo Rápido

### Bot Básico em 30 segundos! ⚡

```javascript
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from 'baileys';
import qrcode from 'qrcode-terminal';

async function criarBot() {
    // Gerencia autenticação automaticamente
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_bot');

    // Cria conexão WhatsApp
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    // Escuta eventos de conexão
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('📱 Escaneie o QR Code com seu WhatsApp!');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'open') {
            console.log('✅ Bot conectado com sucesso!');
        }
    });

    // Salva credenciais automaticamente
    sock.ev.on('creds.update', saveCreds);

    // Escuta mensagens
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.key.fromMe && msg.message) {
            console.log('💬 Nova mensagem:', msg.message);
            
            // Responde automaticamente
            await sock.sendMessage(msg.key.remoteJid, { 
                text: '🤖 Bot ativo! Mensagem recebida!' 
            });
        }
    });
}

// Inicializa o bot
criarBot().catch(console.error);
```

---

## 🔥 Recursos Principais

### 📨 **Mensagens**
- ✅ Envio e recebimento de mensagens de texto
- ✅ Mensagens com mídia (imagem, vídeo, áudio, documento)
- ✅ Mensagens de localização
- ✅ Mensagens de contato
- ✅ Stickers e GIFs

### 👥 **Grupos**
- ✅ Criar e gerenciar grupos
- ✅ Adicionar/remover participantes
- ✅ Configurações de administrador
- ✅ Convites por link
- ✅ Metadados do grupo

### 🔧 **Funcionalidades Avançadas**
- ✅ Status online/offline
- ✅ Indicadores de digitação
- ✅ Confirmação de leitura
- ✅ Perfil e foto de perfil
- ✅ Bloqueio/desbloqueio de contatos
- ✅ Histórico de mensagens

### 🏢 **WhatsApp Business**
- ✅ Catálogo de produtos
- ✅ Mensagens comerciais
- ✅ Labels e etiquetas
- ✅ Comunidades

---

## 📖 Documentação

### 🔗 Links Úteis

- [📚 **Documentação Completa**](https://whiskeysockets.github.io/Baileys/)
- [🌐 **GitHub Oficial**](https://github.com/WhiskeySockets/Baileys)
- [💬 **Comunidade Discord**](#)
- [🐛 **Reportar Bugs**](https://github.com/WhiskeySockets/Baileys/issues)

### 📁 Estrutura do Projeto

```
baileys/
├── 📁 lib/           # Código principal compilado
├── 📁 Types/         # Definições TypeScript
├── 📁 Socket/        # Funcionalidades de socket
├── 📁 Utils/         # Utilitários diversos
├── 📁 WAProto/       # Protobuf do WhatsApp
├── 📄 exemplo-simples.js  # Exemplo pronto para usar
└── 📄 package.json   # Configuração do pacote
```

---

## 🛠️ Comandos Úteis

```bash
# Rodar exemplo simples
node exemplo-simples.js

# Compilar TypeScript
npm run build

# Executar testes
npm test

# Gerar documentação
npm run build:docs
```

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! 🎉

1. **Fork** o projeto
2. Crie sua **feature branch**: `git checkout -b minha-feature`
3. **Commit** suas mudanças: `git commit -m 'Adiciona nova feature'`
4. **Push** para a branch: `git push origin minha-feature`
5. Abra um **Pull Request**

### 📝 Diretrizes

- Siga o padrão de código existente
- Adicione testes para novas funcionalidades
- Documente mudanças no CHANGELOG
- Use commits descritivos

---

## ⚠️ Aviso Legal

Este projeto **NÃO** é afiliado, associado, autorizado, endossado por, ou de qualquer forma oficialmente conectado com o WhatsApp ou qualquer das suas subsidiárias ou afiliadas.

**Use com responsabilidade:**
- ✅ Respeite os Termos de Serviço do WhatsApp
- ✅ Não use para spam ou atividades maliciosas
- ✅ Implemente rate limiting adequado
- ✅ Obtenha consentimento antes de automatizar conversas

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License - Copyright (c) 2025 Rajeh Taher/WhiskeySockets
```

---

## 🌟 Agradecimentos

- 💙 **WhiskeySockets** - Mantenedores originais
- 🤝 **Comunidade Open Source** - Contribuições e feedback
- 📱 **Meta/WhatsApp** - Pela plataforma incrível

---

<div align="center">

### 💡 Gostou do projeto? Deixe uma ⭐ no repositório!

**Feito com ❤️ pela comunidade**

[⬆️ Voltar ao topo](#-baileys---whatsapp-web-api)

</div>