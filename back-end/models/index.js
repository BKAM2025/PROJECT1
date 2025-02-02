const { Sequelize, DataTypes } = require("sequelize");

// create a database connection in your application using a Sequelize instance and the config file
const connection = new Sequelize(
  "e_commerce",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
const category = connection.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
//your user table using sequilize
const user = connection.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: { 
    type: DataTypes.ENUM("user", "seller", "admin"),
    defaultValue: "user",
  }

});
const cart = connection.define("cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
});
const isFavorite = connection.define("isFavorite", {
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})
const product = connection.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});
const slider = connection.define('slider', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  discount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  buttonText: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Shop Now'
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
//user
user.hasMany(product)
product.belongsTo(user)

category.hasMany(product)
product.belongsTo(category)
//cart
user.hasMany(cart)
cart.belongsTo(user)
product.hasMany(cart)
cart.belongsTo(product)
//favorite
user.belongsToMany(product, { through: isFavorite, as: 'FavoriteProducts', foreignKey: 'userId' });
product.belongsToMany(user, { through: isFavorite, as: 'FavoritedByUsers', foreignKey: 'productId' });

// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message car table created successfully!.
// connection
//   .sync({ force: true })
//   .then(() => {
//     console.log("car table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });
module.exports = { user, cart, category, product,isFavorite ,slider};