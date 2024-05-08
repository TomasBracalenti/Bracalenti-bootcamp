import React from "react";
import StaticsLine from "./StaticsLine";
const Statics = ({good,neutral,bad}) => {
    if(good + neutral + bad === 0){
        return (
            <div>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </div>
        );
    }
        const average = (good - bad) / (good + neutral + bad);
        const positive = (good / (good + neutral + bad)) * 100;
        return (
            <div>
                <h2>Statistics</h2>
                <table>
                    <tbody>
                        <StaticsLine text="good" value={good} />
                        <StaticsLine text="neutral" value={neutral} />
                        <StaticsLine text="bad" value={bad} />
                        <StaticsLine text="all" value={good + neutral + bad} />
                        <StaticsLine text="average" value={average} />
                        <StaticsLine text="positive" value={positive + " %"} />
                    </tbody>
                </table>
            </div>
        );
    
}

export default Statics;