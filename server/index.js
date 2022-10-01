const express = require('express');
const app = express();
const users = require('./routes/users');
const request = require('request');
const axios = require('axios');
const jose = require('jose')
const https = require('https');
const bodyParser = require('body-parser');
// const {createHmac} = require('crypto');

const spreadsheetId = '100SvcRPQ_COd5xYAAvDvGcT2KYQa4uctsavZibcYTdY';

require('dotenv').config();

app.use('/api/users', users);
app.use(bodyParser.json())

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

/**
 * Simple API fetch get with API key only
 * GET https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}
 */
 app.get("/api/predictions/form", () => {
 
  const spreadsheetId = '100SvcRPQ_COd5xYAAvDvGcT2KYQa4uctsavZibcYTdY'
  const options = {method: 'GET'};
  const path = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${process.env.GOOGLE_API_KEY}`;
  const req = https.request(path, options, (res) => {

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
})

// Middleware for getting access token using JWT
async function authenticateToken(req, res, next) {
  // Generate the JWT
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
  const grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
  const path = `https://oauth2.googleapis.com/token?grant_type=${grant_type}&assertion=${jwt}`;
  const options = {
    header: {
      Authorization: `Bearer ${process.env.SERVICE_ACCOUNT_PUBLIC_KEY}`
    }
  };

  try {
    const response = await axios.post(path, options);
    const {data} = response || {};
    const {access_token} = data || {};
    req.accessToken = access_token;
  } catch (error) {
    if (error) return res.sendStatus(403)
  }

  next();
}

app.use(authenticateToken);

app.get("/api/predictions/form/questions", async (req, res) => {
  const range = 'Sheet1!A1:C1'
  const path = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?access_token=${req.accessToken}`;
  const method = 'GET';
  const header = {Authorization: `Bearer ${req.accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json'};
  const data = JSON.stringify(req.body);
  const options = {method, header};
  const request = https.request(path, options, response => {
    response.on('data', d => {
      res.json(JSON.parse(d.toString()));
    })
  });

  request.on('error', error => {
    console.log(error);
  });

  request.write(data);
  request.end();
})

app.post("/api/predictions/form/submit", async (req, res) => {
  const range = 'Sheet1!A1';
  const path = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?access_token=${req.accessToken}&valueInputOption=RAW`;
  const method = 'POST';
  const header = {Authorization: `Bearer ${req.accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json'};
  const data = JSON.stringify({ values: [req.body] });
  const options = {method, header};
  const request = https.request(path, options, response => {
    console.log(`statusCode: ${response.statusCode}`);
  
    response.on('data', d => {
      // process.stdout.write(d);
      res.json({ statusCode: response.statusCode });
    })
  });

  request.on('error', error => {
    console.error(error)
    res.json({error});
  })
  
  request.write(data);
  request.end()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});