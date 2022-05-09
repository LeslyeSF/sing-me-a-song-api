/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';
import manyRecommendationFactory from '../factories/manyRecommendationFactory.js';
import { recommendationBodyFactory } from '../factories/recommendationBodyFactory.js';
import recommendationFactory from '../factories/recommendationFactory.js';

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`;
}

describe('POST /recommendations', () => {
  afterAll(disconnect);
  afterEach(truncateRecommendations);
  it('should return status 422 given a invalid body', async () => {
    const invalidBodyRecommendation = {};

    const response = await supertest(app)
      .post('/recommendations')
      .send(invalidBodyRecommendation);

    expect(response.status).toEqual(422);
  });
  it('should return status 201 given a valid body recommendation', async () => {
    const recommendationBody = recommendationBodyFactory();

    const response = await supertest(app)
      .post('/recommendations')
      .send(recommendationBody);

    const findRecommendation = await prisma.recommendation.findFirst({
      where: {
        name: recommendationBody.name,
      },
    });

    expect(response.status).toEqual(201);
    expect(findRecommendation).not.toBeNull();
  });
});
describe('POST /recommendations/:id/upvote', () => {
  afterEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and a score increase given a valid id', async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendation = await recommendationFactory(recommendationBody, 0);

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/upvote`
    );
    const updateRecommendation = await prisma.recommendation.findFirst({
      where: {
        id: recommendation.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(recommendation.score + 1).toEqual(updateRecommendation.score);
  });
});
describe('POST /recommendations/:id/downvote', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and a score decrease given a valid id', async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendation = await recommendationFactory(recommendationBody, 0);

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/downvote`
    );
    const updateRecommendation = await prisma.recommendation.findFirst({
      where: {
        id: recommendation.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(recommendation.score - 1).toEqual(updateRecommendation.score);
  });
  it('should delete the recommendation with a score lower than -5', async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendation = await recommendationFactory(recommendationBody, -5);

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/downvote`
    );
    const updateRecommendation = await prisma.recommendation.findFirst({
      where: {
        id: recommendation.id,
      },
    });

    expect(response.status).toEqual(200);
    expect(updateRecommendation).toBeNull();
  });
});
describe('GET /recommendations', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and ten recommendations', async () => {
    await manyRecommendationFactory(11);
    const response = await supertest(app).get('/recommendations');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeLessThanOrEqual(10);
  });
});
describe('GET /recommendations/:id', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and a recommendation given a valid id', async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendation = await recommendationFactory(recommendationBody, 0);

    const response = await supertest(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual(recommendation.name);
  });
});
describe('GET /recommendations/random', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and a recommendation', async () => {
    await manyRecommendationFactory(2);
    const response = await supertest(app).get('/recommendations/random');

    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
  });
});
describe('GET /recommendations/top/:amount', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);
  it('should return status 200 and the list of recommendations ordered by score', async () => {
    await manyRecommendationFactory(4);
    const amount = 2;

    const response = await supertest(app).get(`/recommendations/top/${amount}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(amount);
    expect(response.body[0].score).toBeGreaterThanOrEqual(
      response.body[1].score
    );
  });
});
