const userController = require('../../../controllers/userController');
const User = require('../../../models/User');

// Mock the User model
jest.mock('../../../models/User');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      req.body = userData;

      User.prototype.save.mockResolvedValue(userData);

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'User created successfully',
        user: expect.any(Object),
      }));
    });

    it('should return 400 if user creation fails', async () => {
      req.body = {};
      User.prototype.save.mockRejectedValue(new Error('Validation error'));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error creating user',
        error: expect.any(String),
      }));
    });
  });

  // Add similar tests for getUsers, getUser, updateUser, and deleteUser
});