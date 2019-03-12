const UserModel = require('../models/users.model');
const crypto = require('crypto');

const pwdHash = (req) => {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest('base64');
  return salt + '$' + hash;
};

exports.insert = (req, res) => {
  req.body.password = pwdHash(req);
  req.body.permissionLevel = 1;
  UserModel.createUser(req.body)
    .then((result) => {
      res.status(201).send({id: result._id});
    });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    req.body.password = pwdHash(req);
  }
  UserModel.patchUser(req.params.userId, req.body).
    then((result) => {
      res.status(204).send({});
    });
};

exports.list = (req, res) => {
  if (req.query.limit && req.query.limit <= 100) {
    let limit = +req.query.limit;
  } else {
    let limit = 10;
  }

  let page = 0;

  if (req.query && req.query.page) {
    req.query.page = +req.query.page;
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  UserModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
    .then((result) => {
      res.status(204).send({});
    });
};
