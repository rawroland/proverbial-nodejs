const client = require('redis-mock').createClient();
const fixtures = {
  proverbs: [
    {
      id: 'b4172533-0450-4ff4-822c-5e18deace155',
      title: 'Alle Wege führen nach Rom',
      meaning: 'Es gibt mehrere Möglichkeiten, eine Aufgabe zu erledigen – nicht nur eine.',
      translations: [
        'All roads lead to Rome'
      ]
    },
    {
      id: '1b47ab56-e991-4161-9a1f-c1a3b97c3556',
      title: 'Ende gut, alles gut',
      meaning: 'Der positive Ausgang einer Sache lässt die negativen Dinge, ' +
      'die sich davor ereignet haben, unwichtig werden.',
      translations: [
        "All's well that ends well"
      ]
    }
  ]
};
const resetFixtures = (data) => {
  client.set('proverbs', JSON.stringify(data.proverbs));
};
resetFixtures(fixtures);

console.log = () => {};
console.error = () => {};
module.exports = {resetFixtures, fixtures};
