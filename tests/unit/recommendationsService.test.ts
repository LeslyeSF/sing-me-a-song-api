/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import faker from '@faker-js/faker';
import { jest } from '@jest/globals';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';

function clearAndResetMocks() {
  jest.clearAllMocks();
  jest.resetAllMocks();
}

const notFoundError = {
  message: '',
  type: 'not_found',
};
const conflictError = {
  message: '',
  type: 'conflict',
};

describe('getById', () => {
  beforeEach(clearAndResetMocks);
  it('should return not found error given a invalid id', () => {
    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);
    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue(null);

    expect(async () => await recommendationService.getById(0)).rejects.toEqual(
      notFoundError
    );
  });
});
describe('downvote', () => {
  beforeEach(clearAndResetMocks);
  it('should delete recommendation with a score less than -5', async () => {
    const recommendation = {
      id: 1,
      name: faker.lorem.words(2),
      youtubeLink: 'https://www.youtube.com/watch?v=-_mioDGQrXc',
      score: -5,
    };

    jest
      .spyOn(recommendationRepository, 'find')
      .mockResolvedValue(recommendation);

    recommendation.score -= 1;

    jest
      .spyOn(recommendationRepository, 'updateScore')
      .mockResolvedValue(recommendation);

    const response = jest
      .spyOn(recommendationRepository, 'remove')
      .mockResolvedValue(null);

    await recommendationService.downvote(1);

    expect(response).toBeCalledWith(recommendation.id);
  });
});
describe('insert', () => {
  beforeEach(clearAndResetMocks);
  it('should return a conflict error', () => {
    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue({
      id: 1,
      name: faker.lorem.words(2),
      youtubeLink: 'https://www.youtube.com/watch?v=-_mioDGQrXc',
      score: -5,
    });

    expect(
      async () =>
        await recommendationService.insert({
          name: faker.lorem.words(2),
          youtubeLink: 'https://www.youtube.com/watch?v=-_mioDGQrXc',
        })
    ).rejects.toEqual(conflictError);
  });
});
describe('getRandom', () => {
  beforeEach(clearAndResetMocks);
  it('should return not found error', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

    expect(async () => await recommendationService.getRandom()).rejects.toEqual(
      notFoundError
    );
  });
});
describe('getScoreFilter', () => {
  it('should return "lte" given a number greater than or equal 0.7', () => {
    const result = recommendationService.getScoreFilter(0.9);

    expect(result).toEqual('lte');
  });
  it('should return "gt" given a number less than 0.7', () => {
    const result = recommendationService.getScoreFilter(0.3);

    expect(result).toEqual('gt');
  });
});
