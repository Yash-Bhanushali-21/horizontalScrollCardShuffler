const totalCardsToPostPoulateAndPrePopulate = () => {
  let totalWidth = Math.floor(document.body.clientWidth / 2);
  let singleCardWidth = 100;
  let containerGap = 20;

  let CardWithGutter = singleCardWidth + containerGap;

  return Math.floor(totalWidth / CardWithGutter);
};

export default totalCardsToPostPoulateAndPrePopulate;
