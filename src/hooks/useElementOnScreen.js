import { useEffect, useRef, useState } from "react";

const useElementOnScreen = (options, customCallBack = null) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    if (customCallBack) customCallBack(entries);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    let observerRefValue = null;
    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRefValue = containerRef.current;
    }
    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [containerRef, options]);
  return [containerRef, isVisible];
};

export default useElementOnScreen;
