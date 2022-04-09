import React from "react";
import "./style.pcss";
const Table = () => {
  return (
    <table>
      <caption>2019 Fourth Quarter Report</caption>
      <thead>
        <tr>
          <th>Project</th>
          <th>October</th>
          <th>November</th>
          <th>December</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Urgently</th>
          <td className="number-cell">$820,180</td>
          <td className="number-cell">$841,640</td>
          <td className="number-cell">$111,270</td>
        </tr>
        <tr>
          <th>Fastly</th>
          <td className="number-cell">$850,730</td>
          <td className="number-cell">$892,580</td>
          <td className="number-cell">$801,240</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
