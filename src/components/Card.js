import { useEffect, useRef } from "react";

const Card = ({
  index,
  scrollToElement,
  activeCardIndexState,
  cardValue,
  observer,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      //clean up.
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [observer, cardRef]);

  return (
    <div
      ref={cardRef}
      onClick={() => scrollToElement(index)}
      id={`card-${index}`}
      className={`card
      ${activeCardIndexState === `card-${index}` ? "active" : ""}
      ${cardValue.toString().includes("dummy") ? "hidden" : ""}`}
    >
      {cardValue}
    </div>
  );
};

export default Card;
