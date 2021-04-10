require('dotenv').config();

const path = require('path');
const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');

const { startHandler, selectHandler, updateHandler, inlineHandler } = require('./handlers');
const getExchange = require('./helpers/getExchange');

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);
const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales'),
});

bot.use(i18n.middleware());

bot.start(startHandler);
bot.on('inline_query', inlineHandler);

bot.action('start', startHandler);
bot.action(/^select(?:::(\w+))$/, selectHandler);
bot.action(/^update(?:::(\w+))(?:::([+-]?[0-9]*[.]?[0-9]+))(?:::([+-]?[0-9]*[.]?[0-9]+))$/, updateHandler);

getExchange().then(data => {
  bot.context.currency = data.map(i => i.ccy);
});

bot.launch();
