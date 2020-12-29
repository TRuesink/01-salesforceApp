import React from "react";
import TaskForm from "./TaskForm";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { createTask } from "../../actions";

class TaskCreate extends React.Component {
  renderActions() {
    return (
      <>
        <button
          onClick={() =>
            history.push(
              `/${this.props.match.params.type}/${this.props.match.params.id}/tasks`
            )
          }
          className="ui button"
        >
          Cancel
        </button>
      </>
    );
  }
  renderContent() {
    return <TaskForm onSubmit={this.onSubmit} />;
  }

  onSubmit = (formValues) => {
    if (this.props.match.params.type === "leads") {
      this.props.createTask("leads", {
        ...formValues,
        WhoId: this.props.match.params.id,
      });
    } else {
      this.props.createTask("opportunities", {
        ...formValues,
        WhatId: this.props.match.params.id,
      });
    }
  };

  render() {
    return (
      <div>
        <Modal
          title="Create Task"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() =>
            history.push(
              `/${this.props.match.params.type}/${this.props.match.params.id}/tasks`
            )
          }
        />
      </div>
    );
  }
}

export default connect(null, { createTask })(TaskCreate);
