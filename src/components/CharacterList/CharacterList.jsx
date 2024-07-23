import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchCharacterData();
  }, [pageNumber]);

  const fetchCharacterData = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pageNumber}`);
      console.log(response.data);
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  const renderPreviousPage = () => {
    setPageNumber((currentPageNumber) => currentPageNumber - 1);
  };

  const renderNextPage = () => {
    setPageNumber((currentPageNumber) => currentPageNumber + 1);
  };

  return (
    <div className="character-list">
      <h2>Rick and Morty Characters</h2>
      <button onClick={renderPreviousPage} disabled={pageNumber === 1}>Previous Page</button>
      <button onClick={renderNextPage}>Next Page</button>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <div>
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;