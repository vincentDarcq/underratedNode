const path = require('path');
const img = path.join(__dirname, './upload');
const pass = require('./rsa/mongopass');
const index = require('./routes/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Pour mapping avec mongoDB
const mongoose = require('mongoose');

// création du serveur
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  'allowedHeaders': ['authorization', 'Content-Type'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

//parser les objets qu'on envoie via les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, './upload')));

mongoose.connect('mongodb+srv://underrated:' + pass.password + '@cluster0.51i9g.mongodb.net/Underrated?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(() => {
    console.log("connexion db OK !")
  }).catch(err => {
    console.log(err);
  }
);

app.use(index);

app.get('/upload?*', (req, res) => {
  res.sendFile(path.join(img, req.query.img));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/polyfills.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/polyfills.js'));
});

app.get('/polyfills.js.map', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/polyfills.js.map'));
});

app.get('/vendor.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/vendor.js'));
});

app.get('/vendor.js.map', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/vendor.js.map'));
});

module.exports = app;