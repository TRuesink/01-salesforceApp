import React from "react";
import OppItem from "./OppItem";

import { connect } from "react-redux";
import { changeLoadingStatus, fetchOpportunities } from "../../actions";
import { LOADING, NOT_LOADING } from "../../actions/types";
import Pagination from "../Pagination";

class OppList extends React.Component {
  componentDidMount() {
    this.props.changeLoadingStatus(LOADING);
  }
  componentDidUpdate(prevProps) {
    if (this.props.opportunities !== prevProps.opportunities) {
      this.props.changeLoadingStatus(NOT_LOADING);
    }
  }
  renderContent() {
    return Object.values(this.props.opportunities).map((opp) => {
      return <OppItem key={opp.Id} opp={opp} />;
    });
  }

  onPageTurn = (pageObj) => {
    this.props.fetchOpportunities(pageObj);
    this.props.changeLoadingStatus(LOADING);
  };

  render() {
    return (
      <div
        className={
          this.props.loadingStatus ? "ui loading segment" : "ui segment"
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
          <tbody>{this.renderContent()}</tbody>
        </table>
        <Pagination
          onPageTurn={this.onPageTurn}
          pagination={this.props.pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingStatus: state.loadingStatus,
    opportunities: state.opportunities.data,
    pagination: state.opportunities.pagination,
  };
};

export default connect(mapStateToProps, {
  changeLoadingStatus,
  fetchOpportunities,
})(OppList);
