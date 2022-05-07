/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { prisma } from '../../src/database.js';
import { recommendations } from './recommendationBodyFactory.js';

export default async function recommendationFactory(
  recommendation: recommendations
) {
  await prisma.recommendation.create({
    data: {
      name: recommendation.name,
      youtubeLink: recommendation.youtubeLink,
    },
  });
}
