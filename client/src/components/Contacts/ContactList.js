import React from "react";
import ContactItem from "./ContactItem";

import { connect } from "react-redux";
import { fetchContacts } from "../../actions";
import Pagination from "../Pagination";

class ContactList extends React.Component {
  renderContent() {
    return Object.values(this.props.contacts.data).map((contact) => {
      return <ContactItem key={contact.Id} contact={contact} />;
    });
  }

  onPageTurn = (pageObj) => {
    this.props.fetchContacts({ ...pageObj, sort: "Name" });
  };

  render() {
    return (
      <div
        className={
          this.props.contacts.isFetching || this.props.accounts.isFetching
            ? "ui loading segment"
            : "ui segment"
        }
      >
        <h1 className="ui header">Contacts</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          {this.props.contacts.isFetching ? (
            <tbody></tbody>
          ) : (
            <tbody>{this.renderContent()}</tbody>
          )}
        </table>
        <Pagination
          onPageTurn={this.onPageTurn}
          pagination={this.props.contacts.pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
})(ContactList);
