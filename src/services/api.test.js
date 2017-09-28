import FetchMock from 'fetch-mock';
import { getUser, getUserFollowers } from './api';

const API_BASE_URL = 'https://api.github.com/users';

describe('api', () => {
  describe('getUser()', () => {
    const successResponse = { name: 'Colin Vinson' };

    beforeEach(() => {
      FetchMock
        .get(`${API_BASE_URL}/cvinson`, successResponse, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
        .get(`${API_BASE_URL}/aUserThatDoesNotExist`, 404)
        .catch(404);
    });

    test('resolves on 200 response', async () => {
      await expect(getUser('cvinson')).resolves.toMatchObject(successResponse);
    });

    test('rejects on 404 response', async () => {
      await expect(getUser('aUserThatDoesNotExist')).rejects.toBeDefined();
    });

    test('sends the appropariate Accept headers', async () => {
      await getUser('cvinson');
      expect(FetchMock.called(`${API_BASE_URL}/cvinson`)).toBeTruthy();
    });

    afterEach(FetchMock.restore);
  });

  describe('getUserFollowers()', () => {
    const successResponse = [{ name: 'Colin Vinson\'s Follower' }];

    beforeEach(() => {
      FetchMock
        .get(`${API_BASE_URL}/cvinson/followers`, successResponse, {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        })
        .get(`${API_BASE_URL}/aUserThatDoesNotExist/followers`, 404)
        .catch(404);
    });

    test('resolves on 200 response', async () => {
      await expect(getUserFollowers('cvinson')).resolves.toMatchObject(successResponse);
    });

    test('rejects on 404 response', async () => {
      await expect(getUserFollowers('aUserThatDoesNotExist')).rejects.toBeDefined();
    });

    test('sends the appropariate Accept headers', async () => {
      await getUserFollowers('cvinson');
      expect(FetchMock.called(`${API_BASE_URL}/cvinson/followers`)).toBeTruthy();
    });

    afterEach(FetchMock.restore);
  });

});
