import faker from '@faker-js/faker';

export function recommendationBodyFactory() {
  return {
    name: faker.lorem.words(2),
    youtubeLink: 'https://www.youtube.com/watch?v=-_mioDGQrXc',
  };
}

export interface recommendations {
  name: string;
  youtubeLink: string;
}
