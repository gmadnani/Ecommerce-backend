const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  //finding all the tags using the findAll function
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })

    //displaying the function
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  //finding a particular tag by id using the findOne function
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    //displaying the data
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  //creating a new tag using the create function
  Tag.create({
    tag_name: req.body.tag_name,
  })
    //displaying the data
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  //updating the id's tag using the update function
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      // if no data : error
      if (!data) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }

      //displaying the data
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  //deleting the id's tag by destroy function
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      //if no data: error
      if (!data) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      //display the data
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
