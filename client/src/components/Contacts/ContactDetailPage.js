import React from "react";
import { connect } from "react-redux";
import { fetchContacts, updateContact } from "../../actions";
import ContactDetail from "./ContactDetail";

class ContactDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchContacts({ Id: this.props.match.params.id });
  }

  onSubmit = (formValues) => {
    this.props.updateContact(this.props.match.params.id, formValues);
  };

  render() {
    const { contact } = this.props;
    const contactId = this.props.match.params.id;

    return (
      <div>
        {Object.values(contact.data).length === 0 ? (
          <div style={{ height: "400px" }} className="ui basic segment">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        ) : (
          <div>
            <h1>{contact.data[contactId].Name}</h1>
            <div className="ui clearing divider"></div>
            <div className="ui segment">
              <ContactDetail
                contact={contact.data[contactId]}
                isFetching={contact.isFetching}
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
    contact: state.contacts,
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
  updateContact,
})(ContactDetailPage);
