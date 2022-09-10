import { useState, useRef } from "react";
import "../styles/styles.css"; //global styles.
import { Card } from "../components";
import { totalCardsToPopulate, createIntersectionObserver } from "../utils";

const CardContainer = () => {
  //calc. default card list.

  const timer = useRef(null);
  const alreadyScrolledTarget = useRef(-1);

  let defaultListOfCards = Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 40)
  );

  //no of cards to pre and post populate.
  let preAndPostLength = totalCardsToPopulate();

  //array of cards.
  let preAndPostArray = Array.from({ length: preAndPostLength * 2 }, () =>
    Math.floor(Math.random() * 40)
      .toString()
      .concat("-dummy")
  );

  const firstHalf = preAndPostArray.slice(
    0,
    Math.floor(preAndPostArray.length / 2)
  );
  const secondHalf = preAndPostArray.slice(
    Math.floor(preAndPostArray.length / 2),
    preAndPostArray.length
  );

  const [cards, setCards] = useState([...defaultListOfCards]);

  const [activeCardIndexState, setActiveCardIndexState] = useState(1);

  const containerRef = useRef(null);

  const loadMore = () => {
    let newSet = [...cards].concat(cards);
    setCards((cards) => [...newSet]);
  };

  const scrollToElement = (index) => {
    let target = document.getElementById(`card-${index}`);
    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
    alreadyScrolledTarget.current = activeCardIndexState;
  };

  const observer = createIntersectionObserver(setActiveCardIndexState);

  const listToRender = [...firstHalf, ...cards, ...secondHalf];

  const centerTheCardWhenScrollingStopped = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (alreadyScrolledTarget.current !== activeCardIndexState) {
        let target = document.getElementById(activeCardIndexState);
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "center",
        });
        alreadyScrolledTarget.current = activeCardIndexState;
      }
    }, 200);
  };

  return (
    <>
      <div
        className="container"
        id="scroller-container"
        ref={containerRef}
        onScroll={centerTheCardWhenScrollingStopped}
      >
        {listToRender.map((card, index) => (
          <Card
            key={`card-index-${index}`}
            index={index}
            observer={observer}
            cardValue={card}
            scrollToElement={scrollToElement}
            activeCardIndexState={activeCardIndexState}
          />
        ))}
      </div>
      <button onClick={loadMore}>Load More</button>
    </>
  );
};

export default CardContainer;
