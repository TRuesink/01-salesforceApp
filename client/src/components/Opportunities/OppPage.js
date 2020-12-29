import React from "react";
import FilterBar from "../FilterBar";
import OppList from "./OppList";

import { connect } from "react-redux";
import { fetchOpportunities, searchOpportunities } from "../../actions";

class OppPage extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities({ limit: 10, page: 1, sort: "Name" });
  }

  onSelectFilter = (term) => {
    if (term === undefined) {
      this.props.fetchOpportunities({ limit: 10, page: 1, sort: "Name" });
    } else if (term.length >= 2) {
      const fields = "Name,CloseDate,StageName,Id";
      this.props.searchOpportunities("Opportunity", term, fields);
    } else {
      this.props.fetchOpportunities({ limit: 10, page: 1, sort: "Name" });
    }
  };

  renderContent() {
    const { accounts } = this.props;
    if (accounts.isFetching === true) {
      return <div className="ui active centered inline loader"></div>;
    }
    return (
      <div>
        <FilterBar onSelectFilter={this.onSelectFilter} />
        <OppList />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    opportunities: state.opportunities.data,
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  searchOpportunities,
})(OppPage);
