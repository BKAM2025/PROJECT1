import React, { useState } from 'react';
import {jwt_decode} from 'jwt-decode';



const getUserIdFromToken = async() => {
    const token = await localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwt_decode(token);
      return decoded.userId; // Adjust this based on your token structure
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };


export default getUserIdFromToken;