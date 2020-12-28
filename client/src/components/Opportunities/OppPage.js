import React from "react";
import FilterBar from "../FilterBar";
import OppList from "./OppList";

import { connect } from "react-redux";
import {
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
} from "../../actions";

class OppPage extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts("test");
    this.props.fetchOpportunities({ limit: 10, page: 1, sort: "Name" });
  }

  onSelectFilter = (formValues) => {
    if (Object.keys(formValues).length === 0) {
      return this.props.fetchOpportunities({
        limit: 10,
        page: 1,
        sort: "Name",
      });
    }
    this.props.fetchOpportunities({ ...formValues, sort: "Name" });
  };

  renderContent() {
    const { accounts } = this.props;
    if (accounts.isFetching === true) {
      return <div className="ui active centered inline loader"></div>;
    }
    return (
      <div>
        <FilterBar
          accounts={accounts.data}
          onSelectFilter={this.onSelectFilter}
        />
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
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
})(OppPage);
