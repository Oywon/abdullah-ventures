import { useEffect } from 'react';

const SEO = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default SEO;
