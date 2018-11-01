import * as uuid from 'uuid';
import * as redis from 'redis-mock';
import {promisify} from 'util';
import {RedisClient} from 'redis';
import {Proverb, ProverbDraft} from "./types";

const getAll = (client: RedisClient): Proverb[] => {
  const getAsync = promisify(client.get).bind(client);
  return getAsync('proverbs').then(proverbs => JSON.parse(proverbs));
};

const getById = async (id: string, client: RedisClient): Promise<Proverb> => {
  const proverbs = await getAll(client);
  return proverbs.find(proverb => proverb.id === id);
};

const create = async (proverb: ProverbDraft, client: RedisClient, translator: any): Promise<Proverb> => {
  proverb.id = uuid();
  const translations = await translator.translate(proverb.title, 'DE', 'EN');
  proverb.translations = [translations.translation, ...translations.translationAlternatives];
  const proverbs = [...await getAll(client), proverb];
  client.set('proverbs', JSON.stringify(proverbs));
  return <Proverb>proverb;
};

const update = async (id: string, updatedProverb: ProverbDraft, client: RedisClient): Promise<Proverb> => {
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
