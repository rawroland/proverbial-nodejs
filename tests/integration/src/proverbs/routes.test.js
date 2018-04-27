const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const routes = require('../../../../src/proverbs/routes');
const {resetFixtures, fixtures} = require('../../../setup');

const app = express();
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
});
