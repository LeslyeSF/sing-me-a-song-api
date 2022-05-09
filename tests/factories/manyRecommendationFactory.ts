/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-await-in-loop */
import { recommendationBodyFactory } from './recommendationBodyFactory.js';
import recommendationFactory from './recommendationFactory.js';

export default async function manyRecommendationFactory(amount: number) {
  for (let i = 0; i < amount; i += 1) {
    const recommendationBody = recommendationBodyFactory();
    await recommendationFactory(recommendationBody, i);
  }
}
