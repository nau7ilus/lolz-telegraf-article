const axios = require('axios');
const { API_URL } = process.env;

module.exports = async () => {
  const res = await axios.get(API_URL);
  if (!res || res.status !== 200 || !res.data) throw new Error('Ошибка при запросе курса');
  return res.data;
};
