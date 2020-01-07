const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    await jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error('something wrong with the token');
    res.status(500).json({ msg: 'Server Error' });
  }
};
