import React from "react";
import OppItem from "./OppItem";

import { connect } from "react-redux";
import { changeLoadingStatus } from "../../actions";
import { LOADING, NOT_LOADING } from "../../actions/types";

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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingStatus: state.loadingStatus,
    opportunities: state.opportunities,
  };
};

export default connect(mapStateToProps, { changeLoadingStatus })(OppList);
