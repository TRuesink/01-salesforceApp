import React from "react";
import Modal from "../Modal";
import AccountForm from "./AccountForm";
import history from "../../history";
import { connect } from "react-redux";
import { createAccount } from "../../actions";

class AccountCreate extends React.Component {
  renderActions() {
    return (
      <>
        <button onClick={() => history.push("/accounts")} className="ui button">
          Cancel
        </button>
      </>
    );
  }
  renderContent() {
    return <AccountForm onSubmit={this.onSubmit} />;
  }

  onSubmit = (formValues) => {
    this.props.createAccount(formValues);
  };
  render() {
    return (
      <div>
        <Modal
          title="Create Account"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/accounts")}
        />
      </div>
    );
  }
}

export default connect(null, { createAccount })(AccountCreate);
