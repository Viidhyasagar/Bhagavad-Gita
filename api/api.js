const BASE_URL = 'http://localhost:3000'; // Replace this with your backend URL

export const getChapters = async () => {
  const response = await fetch(`${BASE_URL}/chapters`);
  const data = await response.json();
  return data;
};

export const getVerses = async (chapterNumber) => {
  const response = await fetch(`${BASE_URL}/verses?chapter=${chapterNumber}`);
  const data = await response.json();
  return data;
};

// Implement similar functions for translations and commentaries
