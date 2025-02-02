const { product,user,admin,slider ,category} = require('../models/index');
const seedSliders = async () => {
  try {
    const sliders = [
      {
        title: "iPhone 14 Series",
        image: "https://fdn.gsmarena.com/imgroot/news/22/09/iphone-14-pro-max-handson/-1200/gsmarena_001.jpg",
        discount: "Up to 10%",
        buttonText: "Shop Now",
        link: "/category/electronics"
      },
      {
        title: "Samsung S24 Ultra",
        image: "https://fdn.gsmarena.com/imgroot/news/24/01/samsung-galaxy-s24-ultra-official/inline/-1200/gsmarena_001.jpg",
        discount: "Up to 15%",
        buttonText: "Shop Now",
        link: "/category/electronics"
      },
      {
        title: "MacBook Pro M3",
        image: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Apple_MacBook_Pro_14_2023_M3.jpg",
        discount: "Up to 12%",
        buttonText: "Learn More",
        link: "/category/laptops"
      },
      {
        title: "AirPods Pro",
        image: "https://fdn.gsmarena.com/imgroot/news/22/09/airpods-pro-2-announced/inline/-1200/gsmarena_002.jpg",
        discount: "Up to 20%",
        buttonText: "Buy Now",
        link: "/category/accessories"
      },
      {
        title: "iPad Pro 2024",
        image: "https://fdn.gsmarena.com/imgroot/news/22/10/ipad-pro-m2-announced/inline/-1200/gsmarena_003.jpg",
        discount: "Special Offer",
        buttonText: "Discover",
        link: "/category/tablets"
      }
    ];

    await slider.bulkCreate(sliders);
    console.log('Sliders seeded successfully!');
  } catch (error) {
    console.error('Error seeding sliders:', error);
  }
};
const seedProducts = async () => {
  try {
    const products = [
      {
        name: 'Laptop',
        price: 1200.99,
        description: 'High-performance laptop with 16GB RAM',
        image: 'https://c1.neweggimages.com/productimage/nb640/BUU5S2410210JVVW6B1.jpg',
        stock: 10,
       
      },
      {
        name: 'Smartphone',
        price: 799.99,
        description: 'Latest smartphone with AMOLED display',
        image: 'https://www.oled-info.com/sites/oled/files/2022-12/Nubia-Z50.jpg',
        stock: 25,
        
        
      },
      {
        name: 'Headphones',
        price: 199.99,
        description: 'Noise-canceling wireless headphones',
        image: 'https://www.jbhifi.com.au/cdn/shop/products/597879-Product-0-I-637956528182648516_d152e2b9-d327-4945-8226-94d39b62e7eb.jpg?v=1660042366',
        stock: 15,
       
      },

      {
        name: 'Smartwatch',
        price: 299.99,
        description: 'Fitness tracking smartwatch with GPS',
        image: 'https://image.made-in-china.com/2f0j00aJdosZlKecqO/IP68-Waterproof-Bluetooth-GPS-Sports-Watch-with-Fitness-Tracking.jpg',
        stock: 30,
        
      },
      {
        name: 'Gaming Chair',
        price: 249.99,
        description: 'Ergonomic gaming chair with lumbar support',
        image: 'https://m.media-amazon.com/images/I/61WRx9WGe2L.jpg',
        stock: 8,
       
      }
    ];


    await product.bulkCreate(products);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
const seedCategory = async () => {
  try {
    const categoryData = [
      {
        name: "laptop",
      },
      {
        name: "tablet",
      },
      {
        name: "phone",
      },

      {
        name: "chair",
      },

      {
        name: "watch",
      }
    ];

    await category.bulkCreate(categoryData);
    console.log('category seeded successfully!');
  } catch (error) {
    console.error('Error seeding category:', error);
  }
};


const seedUser = async () => {
    try {
      const Users= [
        {
          name: 'khalil',
          mail:'khalil@gmail.com',
          password:'0000'
          
         
        },
        {
            name: 'adem',
            mail:'adem@gmail.com',
            password:'0000'
            
        },
        {
            name: 'bochra',
            mail:'bochra@gmail.com',
            password:'0000'
            
        },
        {
            name: 'khaled',
            mail:'khaled@gmail.com ',
            password:'0000'
            
        },
        {
            name: 'mahmoud',
          mail:'mahmod@gmail.com',
          password:'0000'
          
        }
      ];
  
      await user.bulkCreate(Users);
      console.log('User seeded successfully!');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };
  const seedAdmin = async () => {
    try {
      const Admins= [
        {
          name: 'khalil',
          mail:'khalil@gmail.com',
          password:'0000'
          
         
        },
        {
            name: 'adem',
            mail:'adem@gmail.com',
            password:'0000'
            
        },
        {
            name: 'bochra',
            mail:'bochra@gmail.com',
            password:'0000'
            
        },
        {
            name: 'khaled',
            mail:'khaled@gmail.com ',
            password:'0000'
            
        },
        {
            name: 'mahmoud',
          mail:'mahmod@gmail.com',
          password:'0000'
          
        }
      ];
  
      await admin.bulkCreate(Admins);
      console.log('User seeded successfully!');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };

seedProducts();
seedUser();
seedAdmin();
seedSliders()
seedCategory()
module.exports ={ seedProducts,seedUser,seedAdmin,seedSliders,seedCategory};
