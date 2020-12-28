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
            history.push(`/opportunities/${this.props.match.params.id}/tasks`)
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
    console.log({ ...formValues, WhatId: this.props.match.params.id });
    this.props.createTask({
      ...formValues,
      WhatId: this.props.match.params.id,
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Modal
          title="Create Task"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() =>
            history.push(`/opportunities/${this.props.match.params.id}/tasks`)
          }
        />
      </div>
    );
  }
}

export default connect(null, { createTask })(TaskCreate);
