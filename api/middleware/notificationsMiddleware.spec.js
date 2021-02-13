const notificationsMiddleware = require('./notificationsMiddleware');

describe.only('Notification Middleware tests', () => {
  let mockRequest;
  let mockResponse;
  let next;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should validate if inputs are valid', () => {
    mockRequest = {
      body: {
        to: ['saurav1005@gmail.com'],
        cc: ['saurav1005@gmail.com'],
        subject: 'This is test',
        text: 'This is amazing',
      },
    };
    const resp = notificationsMiddleware.validateNotificationsInput(
      mockRequest,
      mockResponse,
      next
    );
    expect(next).toBeCalledTimes(1);
  });
  test('should validate if inputs are invalid', () => {
    mockRequest = {
      body: {
        to: 'test@gmail.com',
        cc: ['saurav1005@gmail.com'],
        subject: 'This is test',
        text: 'This is amazing',
      },
    };
    const resp = notificationsMiddleware.validateNotificationsInput(
      mockRequest,
      mockResponse,
      next
    );
    expect(next).toBeCalledTimes(1);
  });
});
