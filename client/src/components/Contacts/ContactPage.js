import React from "react";
import FilterBar from "../FilterBar";
import ContactList from "./ContactList";

import { connect } from "react-redux";
import { fetchContacts, searchContacts, fetchAccounts } from "../../actions";

class ContactPage extends React.Component {
  componentDidMount() {
    this.props.fetchContacts({ limit: 10, page: 1, sort: "Name" });
    this.props.fetchAccounts({ limit: 1000, select: "Id,Name" });
  }

  onSelectFilter = (term) => {
    if (term === undefined) {
      this.props.fetchContacts({ limit: 10, page: 1, sort: "Name" });
    } else if (term.length >= 2) {
      const fields = "Id,Name,AccountId,Phone,Email";
      this.props.searchContacts("Contact", term, fields);
    } else {
      this.props.fetchContacts({ limit: 10, page: 1, sort: "Name" });
    }
  };

  renderContent() {
    return (
      <div>
        <FilterBar onSelectFilter={this.onSelectFilter} />
        <ContactList />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
  searchContacts,
  fetchAccounts,
})(ContactPage);
