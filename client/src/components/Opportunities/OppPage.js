import React from "react";
import FilterBar from "../FilterBar";
import OppList from "./OppList";

import { connect } from "react-redux";
import {
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
} from "../../actions";
import contactReducer from "../../reducers/contactReducer";

class OppPage extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts("test");
    this.props.fetchContacts("test");
    this.props.fetchOpportunities("test");
  }

  renderContent() {
    const { accounts, contacts } = this.props;
    console.log(this.props);
    if (accounts === null || contacts === null) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <FilterBar
          accounts={accounts}
          opps={null}
          leads={null}
          contacts={contacts}
          funnels={null}
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
    contacts: state.contacts,
    opportunities: state.opportunities,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  fetchContacts,
  fetchOpportunities,
})(OppPage);
