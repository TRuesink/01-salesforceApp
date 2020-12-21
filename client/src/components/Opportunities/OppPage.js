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
        <FilterBar
          accounts={accounts}
          opps={null}
          leads={null}
          contacts={null}
          funnels={null}
          onSelectFilter={this.onSelectFilter}
        />
        <OppList opps={this.props.opportunities} />
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
    opportunities: state.opportunities,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
  changeLoadingStatus,
})(OppPage);
