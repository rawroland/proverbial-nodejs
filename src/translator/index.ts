const create = (translate: any) => {
  return {
    translate: (text: string, from: string, to: string) => {
      return translate(text, to, from).then(translation => translation)
    }
  }
};

export {create};
