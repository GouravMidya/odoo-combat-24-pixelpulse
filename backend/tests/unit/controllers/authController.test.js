const authController = require('../../../controllers/authController');
const User = require('../../../models/User');
const { generateToken } = require('../../../middleware/auth');

jest.mock('../../../models/User');
jest.mock('../../../middleware/auth');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const userData = {
        _id: 'userId',
        email: 'test@example.com',
        username: 'testuser',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      req.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(userData);
      generateToken.mockReturnValue('mockToken');

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        token: 'mockToken',
        user: expect.objectContaining({
          id: 'userId',
          username: 'testuser',
          role: 'user',
        }),
      }));
    });

    it('should return 401 with invalid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      User.findOne.mockResolvedValue({
        comparePassword: jest.fn().mockResolvedValue(false),
      });

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Invalid credentials',
      }));
    });
  });

  // Add similar test for register
});