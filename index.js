// packages
const app = require('express')();
const ejs = require('ejs');
const helmet = require('helmet');
const fs = require('fs');

/* Express */
// pre-middleware
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, `https://${req.headers.host}/${req.url}`);
  }
  next();
});
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1');
  next();
});

// get requests
app.get('/', (req, res) => {
  res.render('notloggedin');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/scripts/:script', (req, res) => {
  if (fs.existsSync('public/public-scripts/'+req.params.script)) {
    res.setHeader('content-type', 'text/plain');
    res.send(fs.readFileSync('public/public-scripts/'+req.params.script));
  }
});

// after-middleware

// static
app.set('trust proxy');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');
app.use(require('express').static(__dirname + '/public'));

// run express server
app.listen(8080, () => {
  console.log('Server is ready.');
});