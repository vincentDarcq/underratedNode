const {
    sendMail
  } = require('../config/mails');
  
exports.sendMail = async (req, res, next) => {
  sendMail(req.body.nom, req.body.mail, req.body.message, res);
}