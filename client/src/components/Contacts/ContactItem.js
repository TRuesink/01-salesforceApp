import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ContactItem extends React.Component {
  render() {
    const { contact, accounts } = this.props;
    return (
      <tr>
        <td data-label="Name">
          <Link to={`/contacts/${contact.Id}/details`}>{contact.Name}</Link>
        </td>
        <td data-label="AccountName">
          {!accounts.data[contact.AccountId]
            ? "loading"
            : accounts.data[contact.AccountId].Name}
        </td>
        <td data-label="Phone">{contact.Phone}</td>
        <td data-label="Email">{contact.Email}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps)(ContactItem);
