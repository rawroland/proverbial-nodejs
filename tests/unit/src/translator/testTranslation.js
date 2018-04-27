module.exports = (translatorName, translate) => {
  describe(translatorName, () => {
    it('translates with alternatives', async () => {
      const translations = await translate('Auf dem Holzweg sein', 'EN', 'DE');
      expect(translations.translation).toBe('be barking up the wrong tree');
      expect(translations.translationAlternatives).toEqual([
        'be barking up the wrong tree',
        'be off the track',
        'Barking up the wrong tree',
        'bark up the wrong tree',
        'be on the wrong track',
        'get hold of the wrong end of the stick',
        'Get off the wrong track'
      ]);
    });
  });
};
