import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/Slider.module.css';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [slides]);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slider/get');
      setSlides(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching slides:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.slider}>
      <div 
        className={styles.slideContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.content}>
              <div className={styles.text}>
                <img src="/apple-logo.png" alt="Brand Logo" className={styles.brandLogo} />
                <h2>{slide.title}</h2>
                <p>{slide.discount} off Voucher</p>
                <button 
                  className={styles.shopButton}
                 
                >
                  {slide.buttonText}
                </button>
              </div>
              <img 
                src={slide.image} 
                alt={slide.title} 
                className={styles.productImage}
                
/>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;