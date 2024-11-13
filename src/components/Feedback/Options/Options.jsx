const Options = ({ updateFeedback, onReset }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          updateFeedback("good");
        }}
      >
        Good
      </button>
      <button
        type="button"
        onClick={() => {
          updateFeedback("neutral");
        }}
      >
        Neutral
      </button>
      <button
        type="button"
        onClick={() => {
          updateFeedback("bad");
        }}
      >
        Bad
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
export default Options;
