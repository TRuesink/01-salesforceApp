import React from "react";
import OppItem from "./OppItem";

import { connect } from "react-redux";
import { fetchOpportunities } from "../../actions";
import Pagination from "../Pagination";

class OppList extends React.Component {
  renderContent() {
    return Object.values(this.props.opportunities.data).map((opp) => {
      return <OppItem key={opp.Id} opp={opp} />;
    });
  }

  onPageTurn = (pageObj) => {
    this.props.fetchOpportunities({ ...pageObj, sort: "Name" });
  };

  render() {
    return (
      <div
        className={
          this.props.opportunities.isFetching
            ? "ui loading segment"
            : "ui segment"
        }
      >
        <h1 className="ui header">Opportunities</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Close Date</th>
              <th>Stage</th>
            </tr>
          </thead>
          {this.props.opportunities.isFetching ? (
            <tbody></tbody>
          ) : (
            <tbody>{this.renderContent()}</tbody>
          )}
        </table>
        <Pagination
          onPageTurn={this.onPageTurn}
          pagination={this.props.opportunities.pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opportunities: state.opportunities,
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
})(OppList);
