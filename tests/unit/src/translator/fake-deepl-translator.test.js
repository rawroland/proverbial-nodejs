const testTranslation = require('./testTranslation');
const {translateWithAlternatives} = require('../../../../src/translator/fake-deepl-translator');

testTranslation('Fake deepl translator', translateWithAlternatives);
