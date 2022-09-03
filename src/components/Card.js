import { useElementOnScreen } from "../hooks";

const intersectionOptions = {
  root: null,
  rootMargin: `0px -${Math.floor(
    document.body.clientWidth / 2
  )}px 0px  -${Math.floor(document.body.clientWidth / 2)}px`,
  threshold: 0,
};

const Card = ({ index, scrollToElement, activeCardIndexState, cardValue }) => {
  const [cardRef, isIntersecting] = useElementOnScreen(intersectionOptions);

  return (
    <div
      ref={cardRef}
      onClick={() => scrollToElement(index)}
      id={`card-${index}`}
      className={`card ${isIntersecting ? "active" : ""} ${
        cardValue.toString().includes("dummy") ? "hidden" : null
      }`}
    >
      {cardValue}
    </div>
  );
};

export default Card;
