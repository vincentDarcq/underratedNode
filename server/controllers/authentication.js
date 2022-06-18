const jwt = require('jsonwebtoken');
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub');
const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');

exports.signin = async (req, res, next) => {
  if(req.query.id === "admin" && req.query.pwd === "password"){
      const token = jwt.sign({}, RSA_KEY_PRIVATE, {
          algorithm: 'RS256',
          subject: "admin"
        })
        res.status(200).json(token)
  } else {
    res.status(401).json('signin fail');
  }
}

exports.validToken = async (req, res, next) => {
  const token = req.query.token;
  if (token) {
    jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
      if (err) { 
        res.status(200).json(false) 
      }else {
        res.status(200).json(true);
      }
    })
  } else {
    res.status(200).json(false);
  }
}