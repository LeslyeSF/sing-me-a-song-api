/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { prisma } from '../../src/database.js';
import { recommendations } from './recommendationBodyFactory.js';

export default async function recommendationFactory(
  recommendation: recommendations,
  score: number
) {
  const response = await prisma.recommendation.create({
    data: {
      name: recommendation.name,
      youtubeLink: recommendation.youtubeLink,
      score,
    },
  });

  return response;
}
