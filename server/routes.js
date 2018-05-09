import examplesRouter from './api/controllers/examples/router';
import examplesRouter from './api/controllers/router';

export default function routes(app) {
  app.use('/apierp/examples', examplesRouter);

}
