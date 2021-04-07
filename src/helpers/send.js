module.exports = async (ctx, text, extra) => {
  try {
    if (ctx.updateType === 'message') {
      await ctx.reply(text, extra);
    } else if (ctx.updateType === 'callback_query') {
      await ctx.answerCbQuery();
      await ctx.editMessageText(text, extra);
    }
  } catch (err) {
    console.error(err);
  }
};
