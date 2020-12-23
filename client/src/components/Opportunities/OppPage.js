import React from "react";
import FilterBar from "../FilterBar";
import OppList from "./OppList";

import { connect } from "react-redux";
import {
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
  changeLoadingStatus,
} from "../../actions";
import { LOADING } from "../../actions/types";

class OppPage extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts("test");
    this.props.fetchOpportunities({ limit: 10, page: 1 });
  }

  componentDidUpdate(prevProps) {}

  onSelectFilter = (formValues) => {
    this.props.changeLoadingStatus(LOADING);
    if (Object.keys(formValues).length === 0) {
      return this.props.fetchOpportunities({ limit: 10, page: 1 });
    }
    this.props.fetchOpportunities(formValues);
  };

  renderContent() {
    const { accounts, contacts } = this.props;
    if (accounts === null || contacts === null) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <FilterBar accounts={accounts} onSelectFilter={this.onSelectFilter} />
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
  changeLoadingStatus,
})(OppPage);
