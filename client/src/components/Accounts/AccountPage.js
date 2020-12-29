import React from "react";
import FilterBar from "../FilterBar";
import AccountList from "./AccountList";

import { connect } from "react-redux";
import { fetchAccounts, searchAccounts } from "../../actions";

class AccountPage extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts({ limit: 10, page: 1, sort: "Name" });
  }

  onSelectFilter = (term) => {
    if (term === undefined) {
      this.props.fetchAccounts({ limit: 10, page: 1, sort: "Name" });
    } else if (term.length >= 2) {
      const fields = "Id,Name,Industry,AnnualRevenue";
      this.props.searchAccounts("Account", term, fields);
    } else {
      this.props.fetchAccounts({ limit: 10, page: 1, sort: "Name" });
    }
  };

  renderContent() {
    return (
      <div>
        <FilterBar onSelectFilter={this.onSelectFilter} />
        <AccountList />
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
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  searchAccounts,
})(AccountPage);
