const router = require('express').Router();
const repository = require('./repository');
const {create: createTranslator} = require('../translator');
const {translateWithAlternatives} = require('deepl-translator');

const client = repository.createClient();
const translator = createTranslator(translateWithAlternatives);

router.get('/proverbs', async (req, res) => {
  const data = await repository.getAll(client);
  res.status(200).json({data});
});

router.post('/proverbs', async (req, res) => {
  const data = await repository.create(req.body, client, translator);
  res.status(201).json({data});
});

router.put('/proverbs/:id', async (req, res) => {
  await repository.update(req.params.id, req.body, client);
  res.status(204).send();
});

module.exports = router;
