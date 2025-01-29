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
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

const admin = connection.define("admin", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});


const category = connection.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

})



const cart = connection.define("cart", {

});


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

// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message car table created successfully!.
// connection
//   .sync({ force: true })
//   .then(() => {
//     console.log("car table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });
// async function testconnection() {
//   try {
//     await connection.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// testconnection()
// export your Model car below
module.exports = { user, cart, category, admin, product };