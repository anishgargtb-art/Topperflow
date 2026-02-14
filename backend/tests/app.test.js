process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

jest.mock('../src/db/pool', () => ({ query: jest.fn() }));
const pool = require('../src/db/pool');

describe('TopperFlow API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('POST /api/auth/google authenticates user', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', name: 'Test User', avatar_url: '', plan_tier: 'free' }] });

    const response = await request(app).post('/api/auth/google').send({ token: 'fake-token' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('POST /api/planner/generate creates plan for authenticated user', async () => {
    const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'test-secret');
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 10, subjects: ['Math'], exam_date: '2030-01-01', schedule: [], reminders: [], created_at: new Date().toISOString() }] })
      .mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .post('/api/planner/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({ subjects: ['Math', 'Physics'], examDate: '2030-01-01' });

    expect(response.statusCode).toBe(201);
    expect(response.body.plan).toBeDefined();
  });

  it('GET /api/analytics returns analytics data', async () => {
    const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'test-secret');
    pool.query.mockResolvedValueOnce({ rows: [{ revisions_count: 5, weak_topics: ['Organic Chemistry'], study_streak: 7, updated_at: new Date().toISOString() }] });

    const response = await request(app).get('/api/analytics').set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.revisionsCount).toBe(5);
  });

  it('POST /api/payments/create-session returns checkout URL', async () => {
    const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'test-secret');
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com' }] })
      .mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .post('/api/payments/create-session')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.statusCode).toBe(201);
    expect(response.body.checkoutUrl).toContain('dashboard');
  });

  it('GET /api/user/profile returns user profile', async () => {
    const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'test-secret');
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', name: 'Tester' }] });

    const response = await request(app).get('/api/user/profile').set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('test@example.com');
  });
});
