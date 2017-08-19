import crypto from 'crypto';

export default text =>
  crypto
    .createHmac('sha512', 'salt')
    .update(text)
    .digest('hex');
