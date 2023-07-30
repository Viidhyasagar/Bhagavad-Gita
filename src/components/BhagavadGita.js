// src/components/BhagavadGita.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BhagavadGita = () => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    try {
      // Make a GET request to your backend API endpoint
      const response = await axios.get('http://localhost:8000/api/verses'); // Adjust the URL to your backend API endpoint

      // Set the fetched verses data to the state
      setVerses(response.data);
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  return (
    <div>
      <h1>Bhagavad Gita Verses</h1>
      <ul>
        {verses.map((verse) => (
          <li key={verse._id}>
            <strong>Chapter {verse.Chapter}, Verse {verse.Verse}</strong>: {verse.Shloka}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BhagavadGita;
