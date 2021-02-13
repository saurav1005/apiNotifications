const fetch = require('node-fetch');
const mailGunService = require('./mailGunService');
const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');
describe('MailGun Service tests', () => {
  test('should send email', async () => {
    const resp = { status: 200, statusText: 'Success' };
    const requestBody = {
      to: ['saurav1005@gmail.com'],
      cc: ['saurav1005@gmail.com'],
      subject: 'This is test',
      text: 'This is amazing',
    };
    fetch.mockReturnValue(Promise.resolve(new Response(resp)));
    const emailStatus = await mailGunService.sendMailGunNotification(
      requestBody
    );
    console.log(emailStatus);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(emailStatus).toBeDefined();
    expect(emailStatus.code).toEqual(200);
    expect(emailStatus.status).toEqual('OK');
    expect(emailStatus.message).toEqual('Mail Sent Successfully');
  });
});
