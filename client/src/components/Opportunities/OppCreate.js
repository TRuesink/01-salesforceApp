import React from "react";
import Modal from "../Modal";
import OppForm from "./OppForm";
import history from "../../history";
import { connect } from "react-redux";
import { createOpportunity } from "../../actions";

class OppCreate extends React.Component {
  renderActions() {
    return (
      <>
        <button
          onClick={() => history.push("/opportunities")}
          className="ui button"
        >
          Cancel
        </button>
      </>
    );
  }
  renderContent() {
    return <OppForm onSubmit={this.onSubmit} />;
  }

  onSubmit = (formValues) => {
    this.props.createOpportunity(formValues);
  };
  render() {
    return (
      <div>
        <Modal
          title="Create Opportunity"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/opportunities")}
        />
      </div>
    );
  }
}

export default connect(null, { createOpportunity })(OppCreate);
