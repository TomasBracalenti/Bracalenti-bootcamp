import React from "react";

const Total = ({ parts }) => {
    const total = parts.reduce((acum, part) => acum + part.exercises, 0);
    return <p><strong>Number of exercises {total}</strong></p>;
}

export default Total;