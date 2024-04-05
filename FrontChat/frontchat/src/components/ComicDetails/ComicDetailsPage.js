// ComicDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SingleComic from './SingleComic';

const ComicDetailsPage = () => {
  const { title } = useParams();

  return (
    <div>
      {/* Display single comic */}
      <SingleComic title={title} />
    </div>
  );
};

export default ComicDetailsPage;

