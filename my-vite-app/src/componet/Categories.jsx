import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Categories.module.css';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/getAll");
      setCategories(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Browse By Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div 
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className={styles.categoryName}>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;