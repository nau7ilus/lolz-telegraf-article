const getExchange = require('../helpers/getExchange');
const { updateKeyboard } = require('../helpers/keyboards');

module.exports = async ({ answerInlineQuery, i18n }) => {
  try {
    const exchangeData = await getExchange();
    const currencies = exchangeData.map(course => ({
      type: 'article',
      id: course.ccy,
      title: course.ccy,
      input_message_content: {
        message_text: i18n.t('select', { course }),
        parse_mode: 'HTML',
      },
      description: i18n.t('exchange', { ccy: course.ccy, baseCcy: course.base_ccy }),
      reply_markup: updateKeyboard({ i18n }, course).reply_markup,
    }));

    answerInlineQuery(currencies);
  } catch (err) {
    console.error(err);
  }
};
