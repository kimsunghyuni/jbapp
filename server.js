const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const axios = require('axios')


const PORT = 3000;

app.use(cookieParser());
app.use(express.json());


app.post('/api/tokens', (req, res) => {

  const mallid = 'jbsh1012'
  version = '2023-12-01'
  access_token = req.body.access_token

  axios.get(`https://${mallid}.cafe24api.com/api/v2/admin/products`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': "application/json",
      'X-Cafe24-Api-Version': version
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Server error');
    });
    
});


app.post('/api/setuser', (req, res) => {
  const { accessToken } = req.body;
  if (accessToken) {
    // 쿠키에 accessToken 저장, 2시간 후 만료
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: 7200000 });
    res.send('AccessToken이 쿠키에 저장되었습니다.');
  } else {
    res.status(400).send('AccessToken이 제공되지 않았습니다.');
  }
});

app.get('/api/checklogin', (req, res) => {
  const accessToken = req.cookies['accessToken'];
  if (accessToken) {
    // accessToken 존재 시 true 반환
    res.json({ isLoggedIn: true });
  } else {
    // accessToken 존재하지 않을 시 false 반환
    res.json({ isLoggedIn: false });
  }
});


app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.send('로그아웃 성공');
});


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});





app.listen(PORT, function () {
  console.log('server is runnging on 3000')
});


