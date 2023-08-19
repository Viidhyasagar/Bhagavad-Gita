import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Typography, Container } from '@mui/material';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

const App = () => {
  const [verses, setVerses] = useState([]);
  const [displayedVerses, setDisplayedVerses] = useState([]);
  const [searchChapter, setSearchChapter] = useState('');
  const [searchVerse, setSearchVerse] = useState('');
  const [pageNumber, setPageNumber] = useState(0); // Track current page number
  const versesPerPage = 10; // Number of verses per page
  const [selectedVerse, setSelectedVerse] = useState(null); // Track selected verse

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/verses');
        const sortedVerses = _.sortBy(response.data, ['Chapter', 'Verse']);
        setVerses(sortedVerses);
        setDisplayedVerses(sortedVerses);
      } catch (error) {
        console.error('Error fetching verses:', error);
      }
    };

    fetchVerses();
  }, []);

  const handleChapterInputChange = (query) => {
    setSearchChapter(query);
  };

  const handleVerseInputChange = (query) => {
    setSearchVerse(query);
  };

  const handleSearch = () => {
    const filteredVerses = verses.filter((verse) => {
      const chapterAndVerse = `Chapter ${verse.Chapter}, Verse ${verse.Verse}`;
      return (
        (chapterAndVerse.toLowerCase().includes(searchChapter.toLowerCase()) ||
        verse._id.toLowerCase().includes(searchVerse.toLowerCase()))
      );
    });
    setDisplayedVerses(filteredVerses);
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(displayedVerses.length / versesPerPage);
  const displayedVersesSlice = displayedVerses.slice(
    pageNumber * versesPerPage,
    (pageNumber + 1) * versesPerPage
  );

  const handleVerseClick = (verse) => {
    setSelectedVerse(verse);
  };

  return (
    <Container className="container" maxWidth="md">
      <div>
        <Typography variant="h3" gutterBottom>
          Bhagavad Gita Verses
        </Typography>
        <div>
          <input
            type="text"
            placeholder="Search by Chapter"
            onChange={(e) => handleChapterInputChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Verse ID"
            onChange={(e) => handleVerseInputChange(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {displayedVersesSlice.map((verse) => (
        <div
          key={verse._id}
          className="verse"
          onClick={() => handleVerseClick(verse)}
        >
          <Typography variant="h5" gutterBottom>
            Chapter {verse.Chapter}, Verse {verse.Verse}
          </Typography>
          <Typography variant="body1">{verse.Shloka}</Typography>
          <Typography variant="body2" className="transliteration" gutterBottom>
            {verse.Transliteration}
          </Typography>
        </div>
      ))}

      {selectedVerse && (
        <div className="verse-detail">
          <Typography variant="h5" gutterBottom>
            Chapter {selectedVerse.Chapter}, Verse {selectedVerse.Verse}
          </Typography>
          <Typography variant="body1">{selectedVerse.Shloka}</Typography>
          {/* Additional details */}
        </div>
      )}

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </Container>
  );
};

export default App;
