import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () =>
      window.removeEventListener('scroll', () => console.log('Clear scroll'));
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
