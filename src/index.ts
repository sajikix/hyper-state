import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createServer, Server } from 'http';
import routeIndex from './routes';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 7777;

const app: express.Express = express();

app.set('views', 'views/');
app.set('view engine', 'pug');
app.use(express.static('public/'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

//catch 404 and forward to error handler
app.use(function(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  err.status = 404;
  next(err);
});

//error handling
app.use(function(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', routeIndex);
const server: Server = createServer(app);
server.listen(PORT, () => {
  console.log('server listeninig at port:' + PORT);
});

export default app;
