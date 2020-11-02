// packages
const app = require('express')();
const ejs = require('ejs');
const helmet = require('helmet');

/* Express */
// pre-middleware
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1');
  next();
});

// get requests
app.get('/', (req, res) => {
  res.render('notloggedin');
});

// after-middleware
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, `https://${req.headers.host}/${req.url}`);
  }
  next();
});

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