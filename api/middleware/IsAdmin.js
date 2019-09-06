const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');

module.exports = (req, res, next) => {
  const { isAdmin } = req.token;
  console.log('jdbskdbfslakdjfbdjsbadiufaebuwb8ioew',req.token);
  
  if (isAdmin !== true) {
    return res.json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized to perform this operation!',
        null
      )
    );
  }

  next();
};

