const intersectionOptions = {
  root: null,
  rootMargin: `0px -${Math.floor(
    document.body.clientWidth / 2
  )}px 0px  -${Math.floor(document.body.clientWidth / 2)}px`,
  threshold: 0,
};

const customCardCallback = (entries, setActiveIndex) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    setActiveIndex(entry.target.id);
  }
};
const createIntersectionObserver = (setActiveIndex) => {
  let tempCallback = (entries) => {
    customCardCallback(entries, setActiveIndex);
  };
  const observer = new IntersectionObserver(tempCallback, intersectionOptions);
  return observer;
};

export default createIntersectionObserver;
