import ExamplesService from '../../services/examples.service';

export class Controller {
  all(req, res) {
    ExamplesService.all()
      .then(r => res.json(r));
  }

  byNit(req, res) {
    ExamplesService
      .byNit(req.params.nit_tercero)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }


}
export default new Controller();
