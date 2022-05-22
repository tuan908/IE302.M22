import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

// Set the top coordinate to 0
// make scrolling smooth
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="scroll-top-btn">
      {isVisible && (
        <IconButton onClick={scrollToTop}>
          <ArrowUpwardIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};
export default ScrollToTop;
