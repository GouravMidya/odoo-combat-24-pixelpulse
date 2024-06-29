const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/User');
const { generateToken } = require('../../middleware/auth');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Users API', () => {
  let adminToken, userToken, adminUserId, regularUserId;

  beforeEach(async () => {
    await User.deleteMany({});

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'admin',
    });
    adminUserId = adminUser._id;
    adminToken = generateToken(adminUser);

    const regularUser = await User.create({
      username: 'user',
      email: 'user@example.com',
      password: 'userpassword',
      role: 'user',
    });
    regularUserId = regularUser._id;
    userToken = generateToken(regularUser);
  });

  describe('GET /api/users', () => {
    it('should get all users for admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(2);
    });

    it('should not allow regular user to get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });
});