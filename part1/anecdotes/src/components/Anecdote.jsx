import React from "react";

const Anecdote = ({ title, anecdote, votes }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    );
}
export default Anecdote;