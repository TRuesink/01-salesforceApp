import React from "react";
import AccountItem from "./AccountItem";

import { connect } from "react-redux";
import { fetchAccounts } from "../../actions";
import Pagination from "../Pagination";

class AccountList extends React.Component {
  renderContent() {
    return Object.values(this.props.accounts.data).map((account) => {
      return <AccountItem key={account.Id} account={account} />;
    });
  }

  onPageTurn = (pageObj) => {
    this.props.fetchAccounts({ ...pageObj, sort: "Name" });
  };

  render() {
    return (
      <div
        className={
          this.props.accounts.isFetching ? "ui loading segment" : "ui segment"
        }
      >
        <h1 className="ui header">Accounts</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Annual Revenue</th>
            </tr>
          </thead>
          {this.props.accounts.isFetching ? (
            <tbody></tbody>
          ) : (
            <tbody>{this.renderContent()}</tbody>
          )}
        </table>
        <Pagination
          onPageTurn={this.onPageTurn}
          pagination={this.props.accounts.pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
})(AccountList);
