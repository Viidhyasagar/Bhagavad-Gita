import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/verses');
        setVerses(response.data);
      } catch (error) {
        console.error('Error fetching verses:', error);
      }
    };

    fetchVerses();
  }, []);

  return (
    <div>
      <h1>Bhagavad Gita Verses</h1>
      <ul>
        {verses.map((verse) => (
          <li key={verse._id}>
            <strong>Chapter {verse.Chapter}, Verse {verse.Verse}:</strong> {verse.Shloka}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
