const {getAll, create, update, getById, createClient} = require('../../../../src/proverbs/repository');
const {resetFixtures, fixtures} = require('../../../setup');
const {translateWithAlternatives} = require('../../../../src/translator/fake-deepl-translator');
const {create: createTranslator} = require('../../../../src/translator');

const translator = createTranslator(translateWithAlternatives);
const client = createClient();

afterEach(() => {
  resetFixtures(fixtures);
});

describe('Proverb repository', () => {
  it('returns the list of all proverbs', async () => {
    const proverbs = await getAll(client);

    expect(proverbs).toEqual(fixtures.proverbs);
  });

  it('retrieves a proverb by id', async () => {
    const proverb = await getById(fixtures.proverbs[0].id, client);

    expect(proverb).toEqual(fixtures.proverbs[0]);
  });

  it('creates a new proverb', async () => {
    let proverbs = await getAll(client);
    expect(proverbs).toHaveLength(2);

    const proverb = {
      title: 'Auf dem Holzweg sein',
      meaning: 'Sich verirren, Umwege machen, ein Ziel nicht richtig oder ein falsches Ziel ansteuern.'
    };
    const saved = await create(proverb, client, translator);

    expect(saved.id).toBeDefined();
    expect(saved.title).toBe('Auf dem Holzweg sein');
    expect(saved.meaning)
      .toBe('Sich verirren, Umwege machen, ein Ziel nicht richtig oder ein falsches Ziel ansteuern.');
    expect(saved.translations).toEqual([
      'be barking up the wrong tree',
      'be barking up the wrong tree',
      'be off the track', 'Barking up the wrong tree',
      'bark up the wrong tree',
      'be on the wrong track',
      'get hold of the wrong end of the stick',
      'Get off the wrong track'
    ]);
    proverbs = await getAll(client);
    expect(proverbs).toHaveLength(3);
  });

  it('updates an existing proverb', async () => {
    expect(await getAll(client)).toHaveLength(2);
    expect(await getById(fixtures.proverbs[0].id, client))
      .toEqual(fixtures.proverbs[0]);

    const proverb = {
      id: 'b4172533-0450-4ff4-822c-5e18deace155',
      title: 'Alle Wege führen nach Rom',
      meaning: 'Es existieren mehrere Möglichkeiten, eine Aufgabe zu erledigen.',
      translations: [
        'All paths lead to Rome'
      ]
    };
    const updated = await update(proverb.id, proverb, client);

    expect(updated).toEqual(proverb);
    expect(await getAll(client)).toHaveLength(2);
  });
});
