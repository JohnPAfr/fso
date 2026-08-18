import { useState } from "react";
import Anecdotes from "./components/Anecdotes";

export const StatisticsLine = ({ text, note }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{note}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine
          text="good"
          note={good}
        />
        <StatisticsLine
          text="neutral"
          note={neutral}
        />
        <StatisticsLine
          text="bad"
          note={bad}
        />
        <StatisticsLine
          text="average"
          note={average.toFixed(2)}
        />
        <StatisticsLine
          text="positive"
          note={`${positive.toFixed(2)}%`}
        />
      </tbody>
    </table>
  );
};

const Button = ({ text, value, click }) => {
  return <button onClick={() => click(value + 1)}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad)) * 100;

  return (
    <>
      <div>
        <h1>UNICAFE</h1>
        <h2>Give feedback</h2>
        <Button
          text="Good"
          value={good}
          click={setGood}
        />
        <Button
          text="Neutral"
          value={neutral}
          click={setNeutral}
        />
        <Button
          text="Bad"
          value={bad}
          click={setBad}
        />
        <h2>Statistics</h2>
        {good > 0 || neutral > 0 || bad > 0 ? (
          <>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              average={average}
              positive={positive}
            />
          </>
        ) : (
          <>No feedback given</>
        )}
      </div>
      <div>
        <h1>ANECDOTES</h1>
        <Anecdotes />
      </div>
    </>
  );
};

export default App;
