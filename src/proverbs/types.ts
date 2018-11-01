export interface Proverb {
  id?: string,
  title: string,
  meaning: string,
  translations: string[]
}

export type ProverbDraft = Partial<Proverb>;
