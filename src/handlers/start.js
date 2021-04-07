const { Markup, Extra } = require('telegraf');
const send = require('../helpers/send');

const wrap = (btn, index, currentRow) => currentRow.length >= index / 1;

module.exports = ctx => {
  try {
    const markup = Markup.inlineKeyboard(
      ctx.currency.map(c => Markup.callbackButton(c, `select::${c}`)),
      { wrap },
    );
    send(ctx, ctx.i18n.t('start'), Extra.HTML().markup(markup));
  } catch (err) {
    console.error(err);
  }
};
