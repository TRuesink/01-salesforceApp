import React from "react";
import Modal from "../Modal";
import LeadForm from "./LeadForm";
import history from "../../history";
import { connect } from "react-redux";
import { createLead } from "../../actions";

class OppCreate extends React.Component {
  renderActions() {
    return (
      <>
        <button onClick={() => history.push("/leads")} className="ui button">
          Cancel
        </button>
      </>
    );
  }
  renderContent() {
    return <LeadForm onSubmit={this.onSubmit} />;
  }

  onSubmit = (formValues) => {
    this.props.createLead(formValues);
  };
  render() {
    return (
      <div>
        <Modal
          title="Create Lead"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/leads")}
        />
      </div>
    );
  }
}

export default connect(null, { createLead })(OppCreate);
