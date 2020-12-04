var express = require('express');
var router = express.Router();
const redis = require('redis');
const uuid = require('uuid');

// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }

const client = redis.createClient(6379, 'localhost');
client.monitor((err, res) => {
  console.log('cilent.monitor', err, res);
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/game', (req, res, next) => {
  res.render('game', {'username': req.query['name']});
});

router.post('/game', (req, res, next) => {
  res.render('game');
});

router.post('/record', (req, res, next) => {
  const id = uuid.v4();
  // const data = JSON.stringify(req.body);

  // client.sadd(id, req.body.username, req.body.time.replace('秒', ''));
  const username = req.body.username;
  const time = req.body.time.replace('秒', '');
  client.set(username, time , redis.print);
  // client.get(req.body.username, redis.print);
  let result = {};
  result['user'] = username;
  result['time'] = time;
  arr.push(result);
  res.render('result');
});

router.get('/result', (req, res, next) => {
  res.render('result')
})
// let arr = new Array();


let arr = new Array();
client.keys('*', (err, keys) => {

  if (err) return;
  for (let i in keys) {
let result = {};

    client.get(keys[i], (err, key) => {
      // map.set(keys[i], key);
      // arr.push({ keys[i]: key });
      result['user'] = keys[i];
      result['time'] = key;
    });
    arr.push(result);
  }
});

router.get('/api/v1/data', (req, res, next) => {
  res.json(arr);
});

router.get('/api/v1/time', (req, res, next) => {
  const time = arr.map(a => a['time']);
  res.json(time);
})

module.exports = router;
