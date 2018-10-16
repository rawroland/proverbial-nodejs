import * as express from 'express';
import * as request from 'supertest';
import * as bodyParser from 'body-parser';
import routes from '../../../../src/proverbs/routes';
import {resetFixtures, fixtures} from '../../../setup';
jest.mock('deepl-translator', () => require('../../../../src/translator/fake-deepl-translator'));

const app: express.Application = express();
app.use(bodyParser.json());
app.use(routes);

afterEach(() => {
  resetFixtures(fixtures);
});

describe('Proverb routes', () => {
  it('responds with a list of all proverbs', async () => {
    const response = await request(app).get('/proverbs');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({data: fixtures.proverbs});
  });

  it('adds a new proverb', async () => {
    const proverb = {
      title: 'Auf dem Holzweg sein',
      meaning: 'Sich verirren, Umwege machen, ein Ziel nicht richtig oder ein falsches Ziel ansteuern.'
    };
    const response = await request(app).post('/proverbs').send(proverb);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toEqual({
      id: expect.any(String),
      title: 'Auf dem Holzweg sein',
      meaning: 'Sich verirren, Umwege machen, ein Ziel nicht richtig oder ein falsches Ziel ansteuern.',
      translations: expect.any(Array)
    });
  });

  it('edits an existing proverb', async () => {
    const proverb = {
      id: 'b4172533-0450-4ff4-822c-5e18deace155',
      title: 'Alle Wege führen nach Rom',
      meaning: 'Es gibt mehrere Möglichkeiten, eine Aufgabe zu erledigen',
      translations: [
        'All roads lead to Rome'
      ]
    };
    const response = await request(app).put(`/proverbs/${proverb.id}`).send(proverb);

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });
});
