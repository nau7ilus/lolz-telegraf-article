const { Markup, Extra } = require('telegraf');

const updateKeyboard = (ctx, course) =>
  Extra.HTML().markup(
    Markup.inlineKeyboard([
      Markup.callbackButton(ctx.i18n.t('back'), 'start'),
      Markup.callbackButton(ctx.i18n.t('update'), `update::${course.ccy}::${course.buy}::${course.sale}`),
    ]),
  );

module.exports = { updateKeyboard };
