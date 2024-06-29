const jwt = require('jsonwebtoken');
const { generateToken, authenticateToken, authorizeRole } = require('../../../middleware/auth');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  describe('generateToken', () => {
    it('should generate a token', () => {
      const user = { _id: 'userId', username: 'testuser' };
      jwt.sign.mockReturnValue('mockToken');

      const token = generateToken(user);

      expect(token).toBe('mockToken');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'userId', username: 'testuser' },
        expect.any(String),
        { expiresIn: '1d' }
      );
    });
  });

  describe('authenticateToken', () => {
    it('should call next() if token is valid', () => {
      const req = {
        headers: { authorization: 'Bearer validToken' },
      };
      const res = {};
      const next = jest.fn();

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 'userId' });
      });

      authenticateToken(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toEqual({ id: 'userId' });
    });

    it('should return 401 if no token is provided', () => {
      const req = { headers: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication token required' });
      expect(next).not.toHaveBeenCalled();
    });

    // Add test for invalid token scenario
  });

  describe('authorizeRole', () => {
    it('should call next() if user has required role', () => {
      const req = {
        user: { role: 'admin' },
      };
      const res = {};
      const next = jest.fn();

      const middleware = authorizeRole(['admin', 'user']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user does not have required role', () => {
      const req = {
        user: { role: 'user' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const middleware = authorizeRole(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});