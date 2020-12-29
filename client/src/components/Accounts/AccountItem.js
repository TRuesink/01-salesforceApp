import React from "react";
import { Link } from "react-router-dom";

class AccountItem extends React.Component {
  render() {
    const { account } = this.props;
    return (
      <tr>
        <td data-label="Name">
          <Link to={`/accounts/${account.Id}/details`}>{account.Name}</Link>
        </td>
        <td data-label="Industry">{account.Industry}</td>
        <td data-label="AnnualRevenu">{account.AnnualRevenue}</td>
      </tr>
    );
  }
}

export default AccountItem;
