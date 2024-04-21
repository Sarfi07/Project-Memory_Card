import { useState, useEffect } from 'react';
import _ from 'lodash';
export default function Cards({ handleCardClick }) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_REACT_APP_GiphyApiKey;
  const query = 'smiley';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=12`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch GIFs');
        }
        return response.json();
      })
      .then((data) => {
        setGifs(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return () => {
      setGifs([]);
    };
  }, []);

  if (loading) {
    return <div>Loading GIFs...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleGifClick = (gifId) => {
    handleCardClick(gifId);
    setGifs(_.shuffle(gifs));
  };

  return (
    <>
      <div id="cardContainer">
        {gifs.map((gif) => (
          <img
            onClick={() => handleGifClick(gif.id)}
            key={gif.id}
            data-id={gif.id}
            src={gif.images.original.url}
            alt={gif.title}
          />
        ))}
      </div>
    </>
  );
}
