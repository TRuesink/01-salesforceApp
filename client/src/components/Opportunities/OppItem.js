import React from "react";

class OppItem extends React.Component {
  render() {
    const { opp } = this.props;
    return (
      <tr>
        <td data-label="Name">{opp.Name}</td>
        <td data-label="Age">{opp.CloseDate}</td>
        <td data-label="Job">{opp.StageName}</td>
      </tr>
    );
  }
}

export default OppItem;
