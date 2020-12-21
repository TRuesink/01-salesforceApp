import React from "react";
import Modal from "../Modal";
import OppForm from "./OppForm";
import history from "../../history";

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
        <button className="ui button primary">Create</button>
      </>
    );
  }
  renderContent() {
    return <OppForm />;
  }
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

export default OppCreate;
