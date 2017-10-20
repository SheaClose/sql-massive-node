* Use `module.exports` to export an object with five methods.
  * `create`, `getOne`, `getAll`, `update`, and `delete`.
* Inside of each method, access the database instance.
* Inside of each method, use the correct SQL file.
  * `create` -> `create_product.sql`.
  * `getOne` -> `read_product.sql`.
  * `getAll` -> `read_products.sql`.
  * `update` -> `update_product.sql`.
  * `delete` -> `delete_product.sql`.
* Don't worry about the parameter(s) in this step.
* `create`, `update`, and `delete` should send status 200 on success and status 500 on failure.
* `getOne` should send status 200 and the product on success and status 500 on failure.
* `getAll` should send status 200 and the products on success and status 500 on failure.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that we have all the `sql` files we'll need to interact with our database, let's create a controller that will execute the `sql`. Create a file called `products_controller.js`. In this file, use `module.exports` to export an `object` with five methods. All methods should capture `req`, `res`, and `next` and create a variable for the database instance off of `req.app`.

```js
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
  }
};
```

Now that our methods have access to the `dbInstance` we can execute our sql files by chaining on `.file_name`. For example, if I wanted to execute `read_product` I would use `dbInstance.read_product()`. Knowing this we can execute our sql files in every method. Chain a `.then` to use `res` to send status 200 and chain a `.catch` to use `res` to send status 500. The `getOne` and `getAll` method should also send `product` and `products` on success.

```js
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.create_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_product()
      .then( product => res.status(200).send( product ) )
      .catch( () => res.status(500).send() );
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.update_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.delete_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
```

We'll worry about how to use parameters after we configure our routes. For right now, this is all we need to do.

</details>

### Solution

<details>

<summary> <code> products_controller.js </code> </summary>

```js
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.create_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_product()
      .then( product => res.status(200).send( product ) )
      .catch( () => res.status(500).send() );
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.update_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.delete_product()
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
```
</details>

## Step 5

### Summary

In this step, we will create endpoints that will call the methods on our controller. We will also require our controller in `index.js`.

### Instructions

* Create the following endpoints: ( `request method`, `url`, `controller method` )
  * `GET` - `/api/products` - `getAll`.
  * `GET` - `/api/product/:id` - `getOne`.
  * `PUT` - `/api/product/:id?desc=...` - `update`.
  * `POST` - `/api/product` - `create`.
  * `DELETE` - `/api/product/:id` - `delete`.

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()
const products_controller = require('./products_controller');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );

app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>


## Step 6

### Summary

In this step, we'll modify the controller to use parameters or the request body.

### Instructions

* Open `products_controller.js`.
* Modify `update` to use `id` from `req.params` and `desc` from `req.query`.
* Modify `getOne` to use `id` from `req.params`.
* Modify `delete` to use `id` from `req.params`.
* Modify the `create` to use `name`, `description`, `price`, and `imageurl` from the request body.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that we know how our routes are configured, we can update our controller to reflect those changes. We'll modify `update` to use `id` from the request parameters and the `desc` from the request query. We'll modify `getOne` to use `id` from the request parameters. We'll modify `delete` to use `id` from the request parameters. And we'll modify `create` to use `name`, `description`, `price` and `imageurl` from the request body. When adding parameters to sql, all you have to do is pass in an array as the first argument and then the element(s) in the array map to `$1`, `$2`, etc... For example: `dbInstance.create_product([ name, description, price, imageurl ])`, name is `$1`, description is `$2`, price is `$3`, and imageurl is `$4`.

```js
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { name, description, price, imageurl } = req.body;

    dbInstance.create_product([ name, description, price, imageurl ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.read_product([ params.id ])
      .then( product => res.status(200).send( product ) )
      .catch( () => res.status(500).send() );
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params, query } = req;

    dbInstance.update_product([ params.id, query.desc ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.delete_product([ params.id ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
```

</details>

### Solution

<details>

<summary> <code> products_controller.js </code> </summary>

```js
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { name, description, price, imageurl } = req.body;

    dbInstance.create_product([ name, description, price, imageurl ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.read_product([ params.id ])
      .then( product => res.status(200).send( product ) )
      .catch( () => res.status(500).send() );
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params, query } = req;

    dbInstance.update_product([ params.id, query.desc ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.delete_product([ params.id ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
```

</details>

## Step 7

### Summary

In this step, we'll test to make sure all the endpoint are working.

### Instructions

* Import the provided `postman_collection` into postman and make sure all the tests pass.

### Solution

<img src="https://github.com/DevMountain/sql-massive-node/blob/solution/readme-assets/1.png" />

## Black Diamond

* Create a React front end to interact with your app.
* Use express static to serve up your React files from a build folder.
* Create a single view that can insert, read, update, and delete products.
* Create a second view that just reads the products and displays them in a pretty way (like Jane.com or amazon).

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>
