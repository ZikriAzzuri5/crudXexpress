const Product = require("./product");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const create = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3003/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.create({
      name,
      price,
      stock,
      status,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;

  const updateData = {
    name,
    price,
    stock,
    status,
  };

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    updateData.image_url = `http://localhost:3003/public/${image.originalname}`;
  }

  Product.updateOne({ _id: id }, updateData)
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
};

const destroy = (req, res) => {
  const { id } = req.params;

  Product.deleteOne({ _id: id })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = { index, view, create, update, destroy };
