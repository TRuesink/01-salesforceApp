import React from "react";
import FilterBar from "../FilterBar";
import LeadList from "./LeadList";

import { connect } from "react-redux";
import { fetchLeads, searchLeads } from "../../actions";

class LeadPage extends React.Component {
  componentDidMount() {
    this.props.fetchLeads({ limit: 10, page: 1, sort: "Name" });
  }

  onSelectFilter = (term) => {
    if (term === undefined) {
      this.props.fetchLeads({ limit: 10, page: 1, sort: "Name" });
    } else if (term.length >= 2) {
      const fields = "Name,Status,Company,Title,Id";
      this.props.searchLeads("Lead", term, fields);
    } else {
      this.props.fetchLeads({ limit: 10, page: 1, sort: "Name" });
    }
  };

  renderContent() {
    return (
      <div>
        <FilterBar onSelectFilter={this.onSelectFilter} />
        <LeadList />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    leads: state.leads,
  };
};

export default connect(mapStateToProps, {
  fetchLeads,
  searchLeads,
})(LeadPage);
