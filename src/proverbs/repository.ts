import * as uuid from 'uuid';
import * as redis from 'redis-mock';
import {promisify} from 'util';
import {RedisClient} from 'redis';

const getAll = (client: RedisClient) => {
  const getAsync = promisify(client.get).bind(client);
  return getAsync('proverbs').then(proverbs => JSON.parse(proverbs));
};

const getById = async (id: string, client: RedisClient) => {
  const proverbs = await getAll(client);
  return proverbs.find(proverb => proverb.id === id);
};

const create = async (proverb: any, client: RedisClient, translator: any) => {
  proverb.id = uuid();
  const translations = await translator.translate(proverb.title, 'DE', 'EN');
  proverb.translations = [translations.translation, ...translations.translationAlternatives];
  const proverbs = [...await getAll(client), proverb];
  client.set('proverbs', JSON.stringify(proverbs));
  return proverb;
};

const update = async (id: string, updatedProverb: object, client: RedisClient) => {
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

export {create, getAll, getById, update, createClient};
