const {getAll, createClient} = require('../../../../src/proverbs/repository');
const {resetFixtures, fixtures} = require('../../../setup');

const client = createClient();

afterEach(() => {
  resetFixtures(fixtures);
});

describe('Proverb repository', () => {
  it('returns the list of all proverbs', async () => {
    const proverbs = await getAll(client);

    expect(proverbs).toEqual(fixtures.proverbs);
  });
});
