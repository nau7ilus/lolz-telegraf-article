const getExchange = require('../helpers/getExchange');
const { updateKeyboard } = require('../helpers/keyboards');
const send = require('../helpers/send');

module.exports = async ctx => {
  try {
    const exchangeData = await getExchange();
    const course = exchangeData.find(c => c.ccy === ctx.match[1]);
    send(ctx, ctx.i18n.t('select', { course }), updateKeyboard(ctx, course));
  } catch (err) {
    console.error(err);
  }
};
