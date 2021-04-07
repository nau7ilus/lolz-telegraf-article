const getExchange = require('../helpers/getExchange');
const { updateKeyboard } = require('../helpers/keyboards');
const send = require('../helpers/send');

const getCurrentTime = () => new Date(Date.now()).toISOString().substr(11, 8);
const getDiff = (a, b) => (a > b ? a - b : b - a);
const serializeDiff = diff => (diff > 0 ? `(${diff.toFixed(3)} ↗️)` : `(${Math.abs(diff.toFixed(3))} ↘️)`);

module.exports = async ctx => {
  try {
    const [currency, oldBuy, oldSale] = ctx.match.slice(1);

    const exchangeData = await getExchange();
    const course = exchangeData.find(c => c.ccy === currency);

    const buyDiff = serializeDiff(getDiff(oldBuy, course.buy));
    const saleDiff = serializeDiff(getDiff(oldSale, course.sale));

    send(
      ctx,
      ctx.i18n.t('updated', { course, currentTime: getCurrentTime(), buyDiff, saleDiff }),
      updateKeyboard(ctx, course),
    );
  } catch (err) {
    console.error(err);
  }
};
