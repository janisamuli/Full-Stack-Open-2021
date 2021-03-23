import React, { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}> {text}</button>;
};

const MaxVotes = (props) => {
  Math.max(...props.allVotes);
  if (Math.max(...props.allVotes) === 0) {
    return "";
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[props.allVotes.indexOf(Math.max(...props.allVotes))]}
      <br></br>
      has {Math.max(...props.allVotes)} votes
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];

  const [selected, setSelected] = useState(0);
  const [allVotes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleRandom = () => {
    const random = Math.floor(Math.random() * 6);
    setSelected(random);
  };

  const handleVote = () => {
    const copy = [...allVotes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {allVotes[selected]} votes
      <br></br>
      <br></br>
      <Button handleClick={handleRandom} text="next anecdote" />
      <Button handleClick={handleVote} text="vote" />
      <MaxVotes anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  );
};

export default App;
