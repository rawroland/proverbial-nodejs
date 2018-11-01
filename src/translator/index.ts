import {Translation} from "./types";

const create = (translate: any) => {
  return {
    translate: (text: string, from: string, to: string): Translation => {
      return translate(text, to, from).then(translation => translation)
    }
  }
};

export {create};
