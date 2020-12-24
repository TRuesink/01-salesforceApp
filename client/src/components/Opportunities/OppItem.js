import React from "react";
import { Link } from "react-router-dom";

class OppItem extends React.Component {
  render() {
    const { opp } = this.props;
    return (
      <tr>
        <td data-label="Name">
          <Link to={`/opportunities/${opp.Id}/details`}>{opp.Name}</Link>
        </td>
        <td data-label="Age">{opp.CloseDate}</td>
        <td data-label="Job">{opp.StageName}</td>
      </tr>
    );
  }
}

export default OppItem;
