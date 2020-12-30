import React from "react";
import Modal from "../Modal";
import ContactForm from "./ContactForm";
import history from "../../history";
import { connect } from "react-redux";
import { createContact } from "../../actions";

class ContactCreate extends React.Component {
  renderActions() {
    return (
      <>
        <button onClick={() => history.push("/contacts")} className="ui button">
          Cancel
        </button>
      </>
    );
  }
  renderContent() {
    return <ContactForm onSubmit={this.onSubmit} />;
  }

  onSubmit = (formValues) => {
    this.props.createContact(formValues);
  };
  render() {
    return (
      <div>
        <Modal
          title="Create Contact"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/contacts")}
        />
      </div>
    );
  }
}

export default connect(null, { createContact })(ContactCreate);
