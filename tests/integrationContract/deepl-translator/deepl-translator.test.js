const {translateWithAlternatives} = require('deepl-translator');
const testTranslation = require('../../unit/src/translator/testTranslation');

testTranslation('Deepl translator', translateWithAlternatives);
