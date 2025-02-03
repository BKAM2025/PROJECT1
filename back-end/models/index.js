const { Sequelize, DataTypes } = require("sequelize");
console.log("hello")
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


//your user table using sequilize
const user = connection.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
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
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }

});




const category = connection.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})



const cart = connection.define("cart", {

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

user.hasMany(product)
product.belongsTo(user)
category.hasMany(product)
product.belongsTo(category)
user.hasMany(cart)
cart.belongsTo(user)
product.hasMany(cart)
cart.belongsTo(product)
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

module.exports = { user, cart, category, product, isFavorite };