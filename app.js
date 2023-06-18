import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import nocache from 'nocache';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import router from './src/routes/index.js';
import accountRoutes from './src/routes/accountRouter.js';
import studentRoutes from './src/routes/studentRouter.js';
import teacherRoutes from './src/routes/teacherRouter.js';
import apiRoutes from './src/routes/apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(nocache());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views/');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}))

// Put Router below here
app.use('/', router);
app.use('/', accountRoutes);
app.use('/', studentRoutes);
app.use('/', teacherRoutes);
app.use('/api', apiRoutes);

// ...more router here

// Put Router above here

function handleNotFound(req, res, next) {
  next(new Error('not found'));
}

app.set('trust proxy', true);

app.use(handleNotFound);
app.use((err, req, res, next) => {
  if (err) {
    if (err.message === 'not found') {
      res.status(404).send('Not Found')
    } else {
      res.status(500).send({
        stack: err?.stack,
      })
    }
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
