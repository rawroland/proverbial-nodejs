const app = require('./app');
const config = require('./config');
const express = require('express');
const {resetFixtures, fixtures} = require('./tests/setup');
const proverbs = [
  ...fixtures.proverbs,
  {
    title: 'Alte Liebe rostet nicht',
    meaning: 'Wenn man sich schon sehr lange liebt, so wird man sich auch noch in der Zukunft lieben.',
    id: 'fd652f14-c8a2-4237-be73-466cef9e55d6',
    translations: [
      'Old love does not rust',
      'Old love does not rust',
      `Old love doesn't rust`,
      'Old love does not corrode',
      `Old love doesn't corrode`,
      'Old love never dies',
      'Old love is not rusty',
      'An old love does not rust'
    ]
  }
];

resetFixtures({proverbs});
const server = express();
server.use(app);

const port = config.PORT || 3001;
server.listen(port, () => {
  console.log(`Proverbial backend was started on port ${port}`);
});
