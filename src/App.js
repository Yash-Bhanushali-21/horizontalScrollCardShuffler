import "./styles.css";
import { useState, useRef } from "react";
import { useElementOnScreen } from "./useElementByScroll";

//TODO :
//1.handle load more situation for dummy cards.
//2.add cards deletion too.

const options = {
  root: null,
  rootMargin: `0px -${Math.floor(
    document.body.clientWidth / 2
  )}px 0px  -${Math.floor(document.body.clientWidth / 2)}px`,
  threshold: 0,
};

const totalCardsToPostPoulateAndPrePopulate = () => {
  let totalWidth = Math.floor(document.body.clientWidth / 2);
  let singleCardWidth = 100;
  let containerGap = 20;

  let CardWithGutter = singleCardWidth + containerGap;

  return Math.floor(totalWidth / CardWithGutter);
};

const CustomCardComponent = ({
  index,
  scrollToElement,
  activeCardIndexState,
  cardValue,
}) => {
  const [cardRef, isIntersecting] = useElementOnScreen(options);

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

export default function App() {
  let defaultListOfCards = Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 40)
  );

  let preAndPostLength = totalCardsToPostPoulateAndPrePopulate();
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

  const [cards, setCards] = useState([
    ...firstHalf,
    ...defaultListOfCards,
    ...secondHalf,
  ]);

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
  };
  //possible approach on event(s) response container

  return (
    <div className="App">
      <div
        className="container"
        id="scroller-container"
        ref={containerRef} /*onScroll={debounceScroll} */
      >
        {cards.map((card, index) => (
          <CustomCardComponent
            key={`card-index-${index}`}
            index={index}
            cardValue={card}
            scrollToElement={scrollToElement}
            activeCardIndexState={activeCardIndexState}
          />
        ))}
      </div>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

/* 



  const gapValueRef = useRef(0);
  const childWidthRef = useRef(0);
  const visibleContainerRef = useRef(0);
 const doSomethingOnScroll = (e) => {
    let container = e.target;

    let containerChild = e.target.firstChild;
    childWidthRef.current = containerChild.clientWidth;

    const containerLeftScroll = container.scrollLeft;
    console.log(container.clientWidth);

    visibleContainerRef.current = container.clientWidth;

    const computedStyles = window.getComputedStyle(container);
    gapValueRef.current = parseInt(
      computedStyles.getPropertyValue("gap").slice(0, -2),
      10
    );

    //gapValueRef.current = gapValueRef.current;

    const activeCardIndex = Math.floor(
      Math.floor(containerLeftScroll) /
        (childWidthRef.current + gapValueRef.current)
    );

    const numberOfPossibleCardsInVisibleContainer = Math.floor(
      visibleContainerRef.current /
        (childWidthRef.current + gapValueRef.current)
    );

    //what ever number of cards are posssible, we simply do a floor of /2
    //to land in the middle.

    if (activeCardIndexState !== activeCardIndex + 2) {
      setActiveCardIndexState(activeCardIndex + 2);
    }
  };

*/
