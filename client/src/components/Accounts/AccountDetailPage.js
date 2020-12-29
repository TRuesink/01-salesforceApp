import React from "react";
import { connect } from "react-redux";
import { fetchAccounts, updateAccount } from "../../actions";
import AccountDetail from "./AccountDetail";

class AccountDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts({ Id: this.props.match.params.id });
  }

  onSubmit = (formValues) => {
    this.props.updateAccount(this.props.match.params.id, formValues);
  };

  render() {
    const { account } = this.props;
    const accountId = this.props.match.params.id;

    return (
      <div>
        {Object.values(account.data).length === 0 ? (
          <div style={{ height: "400px" }} className="ui basic segment">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        ) : (
          <div>
            <h1>{account.data[accountId].Name}</h1>
            <div className="ui clearing divider"></div>
            <div className="ui segment">
              <AccountDetail
                account={account.data[accountId]}
                isFetching={account.isFetching}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.accounts,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  updateAccount,
})(AccountDetailPage);
