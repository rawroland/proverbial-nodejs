const create = translate => {
  return {
    translate: (text, from, to) => {
      return translate(text, to, from).then(translation => translation)
    }
  }
};

module.exports = {create};
