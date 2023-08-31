// This code is a simple React application that fetches Bhagavad Gita
// Verses from a server and displays them on a webpage

// !1. Import Statements:
import React, { useState, useEffect } from 'react';
//  It uses functional components and the useState and useEffect hooks for state management and data fetching
import axios from 'axios';


/**
 * !2.Functional Component
 */
const App = () => {

  /** 
   * !3.State Initialization
   *  * Initialize a state variable called verses using the useState hook.
   *  ? This variable will hold the Bhagavad Gita verses retrieved from the server.
   */
  const [verses, setVerses] = useState([]);

  /** 
   * !4.useEffect Hook:
   * *Use the useEffect hook to perform side effects in the component.
   * *In this case, it fetches data from the server when the component mounts -
   * ?-([] as the dependency array means it runs once after the initial render).
   */
  useEffect(() => {

    /**
     * !5.Data Fetching
     * Define an asynchronous function fetchVerses that uses axios to make a GET request 
     * - to 'http://localhost:8001/api/verses' to retrieve the Bhagavad Gita verses.
     * If the request is successful, the response data is stored in the 
     * - verses state variable using setVerses.
     * If there's an error, it's caught and logged to the console.
     */
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

  /** 
   * !6.Render Content:
   * ?In the component's render method, it displays the fetched Bhagavad Gita verses.
   * ?The title "Bhagavad Gita Verses" is displayed as an h1 element.
   * *The verses are listed as li elements within an unordered list (ul).
   * ?It maps over the verses state and displays each verse's chapter, verse number, and shloka (text).
   */
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