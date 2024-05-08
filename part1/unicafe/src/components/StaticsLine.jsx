import React from "react";

const StaticsLine = ({ text, value }) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}
export default StaticsLine;