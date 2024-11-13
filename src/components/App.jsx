import { useEffect, useState } from "react";
import Description from "./Description/Description";
import Options from "./Feedback/Options/Options";
import Feedback from "./Feedback/Feedback";
import axios from "axios";
import ArticleList from "./ArticleList/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function FetchArticles() {
      const response = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      setArticles(response.data.hits);
    }
    FetchArticles();
  }, []);
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const updateFeedback = (feedbackType) => {
    setFeedback((feedback) => ({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    }));
  };
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const onReset = () => setFeedback({ good: 0, neutral: 0, bad: 0 });

  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <div>
      {articles.length > 0 && <ArticleList items={articles} />}
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        onReset={onReset}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        "No feedback yet"
      )}
    </div>
  );
}
export default App;
