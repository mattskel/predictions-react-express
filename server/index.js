const express = require('express');
const app = express();
const users = require('./routes/users');
const jose = require('jose')
const https = require('https');
require('dotenv').config();

app.use('/api/users', users);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/posts', async (req, res) => {

  // Generate the JWT
  // Remember to remove all the "\n" from the string
  const ecPrivateKey = await jose.importPKCS8(process.env.SERVICE_ACCOUNT_PRIVATE_KEY, 'RS256')
  const jwt = await new jose.SignJWT({
    scope: "https://www.googleapis.com/auth/spreadsheets"
  })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setIssuer('yearly-predictions-form@yearly-predictions-form.iam.gserviceaccount.com')
    .setAudience('https://oauth2.googleapis.com/token')
    .setExpirationTime('1h')
    .sign(ecPrivateKey)

  // Generate the bearer token
  // This is just the api key  
  const grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
  const path = `https://oauth2.googleapis.com/token?grant_type=${grant_type}&assertion=${jwt}`;
  const options = {
    method: 'POST',
    header: {
      Authorization: `Bearer ${process.env.SERVICE_ACCOUNT_PUBLIC_KEY}`
    }
  };

  const request = https.request(path, options, response => {
    console.log(`statusCode: ${response.statusCode}`)
  
    response.on('data', d => {
      process.stdout.write(d);
    })
  });

  request.on('error', error => {
    console.error(error)
  })
  
  request.end();
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});