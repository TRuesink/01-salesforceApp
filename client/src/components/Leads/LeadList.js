import React from "react";
import LeadItem from "./LeadItem";

import { connect } from "react-redux";
import { fetchLeads } from "../../actions";
import Pagination from "../Pagination";

class LeadList extends React.Component {
  renderContent() {
    return Object.values(this.props.leads.data).map((lead) => {
      return <LeadItem key={lead.Id} lead={lead} />;
    });
  }

  onPageTurn = (pageObj) => {
    this.props.fetchLeads({ ...pageObj, sort: "Name" });
  };

  render() {
    return (
      <div
        className={
          this.props.leads.isFetching ? "ui loading segment" : "ui segment"
        }
      >
        <h1 className="ui header">Leads</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Lead Status</th>
              <th>Company</th>
              <th>Title</th>
            </tr>
          </thead>
          {this.props.leads.isFetching ? (
            <tbody></tbody>
          ) : (
            <tbody>{this.renderContent()}</tbody>
          )}
        </table>
        <Pagination
          onPageTurn={this.onPageTurn}
          pagination={this.props.leads.pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leads: state.leads,
  };
};

export default connect(mapStateToProps, {
  fetchLeads,
})(LeadList);
