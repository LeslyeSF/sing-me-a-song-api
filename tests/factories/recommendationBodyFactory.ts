import faker from '@faker-js/faker';

export function recommendationBodyFactory() {
  return {
    name: faker.lorem.words(2),
    youtueLink: faker.internet.url(),
  };
}

export interface recommendations {
  name: string;
  youtubeLink: string;
}
