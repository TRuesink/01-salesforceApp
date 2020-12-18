import React from "react";
import OppItem from "./OppItem";

class OppList extends React.Component {
  renderContent() {
    return Object.values(this.props.opps).map((opp) => {
      return <OppItem opp={opp} />;
    });
  }
  render() {
    return (
      <div className="ui segment">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Close Date</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>{this.renderContent()}</tbody>
        </table>
      </div>
    );
  }
}

export default OppList;
