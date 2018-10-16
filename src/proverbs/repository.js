const uuid = require('uuid');
const redis = require('redis-mock');
const {promisify} = require('util');

const getAll = client => {
  const getAsync = promisify(client.get).bind(client);
  return getAsync('proverbs').then(proverbs => JSON.parse(proverbs));
};

const getById = async (id, client) => {
  const proverbs = await getAll(client);
  return proverbs.find(proverb => proverb.id === id);
};

const create = async (proverb, client, translator) => {
  proverb.id = uuid();
  const translations = await translator.translate(proverb.title, 'DE', 'EN');
  proverb.translations = [translations.translation, ...translations.translationAlternatives];
  const proverbs = [...await getAll(client), proverb];
  client.set('proverbs', JSON.stringify(proverbs));
  return proverb;
};

const update = async (id, updatedProverb, client) => {
  const proverbs = (await getAll(client)).map(proverb => {
    if (proverb.id !== id) {
      return proverb;
    }
    return {...proverb, ...updatedProverb};
  });
  client.set('proverbs', JSON.stringify(proverbs));
  return proverbs.find(proverb => proverb.id === id);
};

const createClient = () => {
  return redis.createClient();
};

module.exports = { create, getAll, getById, update, createClient };
