const db = require('../connection');
const { seed } = require('../seed');
const app = require('../app.js');
const request = require('supertest');

beforeEach(() => {
  return seed();
});

afterAll(() => {
  return db.end();
});

describe('app', () => {
  test('404 unavailable path', () => {
    return request(app)
      .post('/not-a-path')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Path not found');
      });
  });
  describe('/api/snacks', () => {
    test('200: accepts a category_id query', () => {
      return request(app)
        .get('/api/snacks?category_id=1')
        .expect(200)
        .then(({ body: { snacks } }) => {
          expect(snacks).toHaveLength(2);
        });
    });
    test('404: returns an error for a non-existent category_id', () => {
      return request(app)
        .get('/api/snacks?category_id=1000')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('category_id not found');
        });
    });
    test('200: returns some snacks when im asking for crisps', () => {
      return request(app).get('/api/snacks?category_id=5').expect(200);
    });
  });
});
