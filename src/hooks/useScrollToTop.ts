
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  top?: number;
  left?: number;
}

/**
 * Custom hook that scrolls the window to the top whenever
 * the location pathname changes
 * 
 * @param options - ScrollToTopOptions
 */
export const useScrollToTop = (options: ScrollToTopOptions = {}) => {
  const { pathname } = useLocation();
  const { behavior = 'smooth', top = 0, left = 0 } = options;
  
  useEffect(() => {
    window.scrollTo({
      top,
      left,
      behavior
    });
  }, [pathname, behavior, top, left]);
};
