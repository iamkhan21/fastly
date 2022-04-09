import React from "react";

const Fleet = () => {
  return (
    <article className="content">
      <h2>Fleet management</h2>
      <br />
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-cell">Project</th>
            <th className="table-cell">October</th>
            <th className="table-cell">November</th>
            <th className="table-cell">December</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="table-cell">Urgently</th>
            <td className="table-cell table-cell__number">$820,180</td>
            <td className="table-cell table-cell__number">$841,640</td>
            <td className="table-cell table-cell__number">$111,270</td>
          </tr>
          <tr>
            <th className="table-cell">Fastly</th>
            <td className="table-cell table-cell__number">$850,730</td>
            <td className="table-cell table-cell__number">$892,580</td>
            <td className="table-cell table-cell__number">$801,240</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default Fleet;
