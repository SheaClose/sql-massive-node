module.exports = {
  create(req, res) {
    const db = req.app.get('db');
    const { name, description, price, imageurl } = req.body;
    db
      .create_product([name, description, price, imageurl])
      .then(response => res.send(response));
  },
  getOne(req, res) {
    const db = req.app.get('db');
    const { id } = req.params;
    db.read_product(id).then(response => res.send(response));
  },
  getAll(req, res) {
    const db = req.app.get('db');
    db.read_products().then(prod => res.send(prod));
  },
  update(req, res) {
    const db = req.app.get('db');
    db
      .update_product(req.params.id, req.body.description)
      .then(resp => res.send(resp));
  },
  delete(req, res) {
    const db = req.app.get('db');
  }
};
