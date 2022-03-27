const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  //getting all the data use findAll function
  Category.findAll({

    //choosing it from the product model
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => {
      
      //if no data found: error
      if(!data) {
        res.status(404).json({message: 'No categories found'});
        return;
      }

      //displaying the data
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


router.get('/:id', (req, res) => {

  //finding a particular data by id using the findOne function
  Category.findOne({
    where: {
      id: req.params.id
    },

    //choosing it from the product model
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(data => {

      //if no data found: error
      if(!data) {
        res.status(404).json({message: 'No categories found'});
        return;
      }

      //displaying the data
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


router.post('/', (req, res) => {

  //creating a new category by name using create function
  Category.create({
    category_name: req.body.category_name
  })

    //adding the data and displaying it
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {

  //updating a particular id's data using the update function
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {

      //if no data found : error
      if (!data) {
        res.status(404).json({message:'No category found with this id'});
        return;
      }

      //displaying the data
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {

  //deleting the id's data by the destroy function
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      //if no data found : error
      if (!data){
        res.status(404).json({message: 'No category found with that id.'});
        return;
      }

      //display the data
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
