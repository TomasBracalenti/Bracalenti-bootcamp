import React from "react";

const Anecdote = ({ title, anecdote }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{anecdote}</p>
        </div>
    );
}
export default Anecdote;