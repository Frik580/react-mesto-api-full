const jwt = require('jsonwebtoken');

const JWT_SECRET = 'some-secret-key';
const getJwtToken = (id) => jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: '7d' });
const getPayload = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { getJwtToken, getPayload };
