import express, { ErrorRequestHandler } from "express";
import { renderFile } from "ejs";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import getRoutes from "./utils/getRoutes";
import { Route } from "./types/Route";
import { NestedArray } from "./types/NestedArray";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const main = async () => {

  app.engine('ejs', renderFile);
  app.set('view engine', 'ejs');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static('public'))

  // imports routes dynamically via fs
  const routes = await getRoutes();

  // recursively reads imported routes
  const useRoutes = (routes: NestedArray<Route>) => {
    for (const route of routes) {
      if (Array.isArray(route)) {
        useRoutes(route) // If route is an array (folder), then read into it
      }
      else {
        if (route?.router) {
          app.use(`/${route.name}`, route.router) // If route, then use it
          console.log(route.name)
        }
        else {
          console.log(`Route "${route.name}" is unused`)
        }
      }
    }
  }

  useRoutes(routes)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    if (next) next(createError(404));
  });

  // error handler
  app.use(((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
  }) as ErrorRequestHandler);

  app.listen(port, () => { console.log(`Successfully listening at http://localhost:${port}`) });

}

main();