/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
describe('POST /recommendations', () => {
  it('should return status 422 given a invalid body', async () => {});
  it('should return status 201 given a valid body recommendation', async () => {});
});
describe('POST /recommendations/:id/upvote', () => {
  it('should return status 404 given a invalid id', () => {});
  it('should return status 200 and a score increase given a valid id', () => {});
});
describe('POST /recommendations/:id/downvote', () => {
  it('should return status 404 given a invalid id', () => {});
  it('should return status 200 and a score decrease given a valid id', () => {});
  it('should delete the recommendation with a score lower than -5', () => {});
});
describe('GET /recommendations', () => {
  it('should return status 200 and ten recommendations', () => {});
});
describe('GET /recommendations/:id', () => {
  it('should return status 404 given a invalid id', () => {});
  it('should return status 200 and a recommendation given a invalid id', () => {});
});
describe('GET /recommendations/random', () => {
  it('should return status 404 given there are no recommendations', () => {});
  it('should return status 200 and a recommendation', () => {});
});
describe('GET /recommendations/top/:amount', () => {
  it('should return the list of recommendations ordered by score', () => {});
});
