// mineflayer bot for crystal pvp
const mineflayer = require('mineflayer');
const config = require('./config');
const CrystalAura = require('./modules/combat/CrystalAura');
const Surround = require('./modules/combat/Surround');

// bot config
const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'CrystalBot',
  version: '1.21.1'
});

// load modules
const crystalAura = new CrystalAura(bot);
const surround = new Surround(bot);

bot.on('spawn', () => {
  console.log('bot spawned!');
  crystalAura.enable();
  surround.enable();
});

bot.on('kicked', (reason) => {
  console.log('kicked:', reason);
});

bot.on('error', (err) => {
  console.log('error:', err);
});
