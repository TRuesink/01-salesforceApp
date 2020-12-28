import React from "react";
import { connect } from "react-redux";
import { fetchTasks, updateTask } from "../../actions";
import TaskItem from "./TaskItem";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

class TaskList extends React.Component {
  renderCheckBox({ input, task }) {
    return (
      <TaskItem
        key={task.Id}
        title={task.Subject}
        description={task.Subscription}
        date={task.ActivityDate}
        input={input}
      />
    );
  }

  onTaskCheck(id, isClosed) {
    const status = isClosed ? "Not Started" : "Completed";
    this.props.updateTask(id, { Status: status });
  }

  renderTaskList() {
    const tasks = this.props.tasks.data;
    return Object.values(tasks).map((task) => {
      return (
        <Field
          onChange={() => this.onTaskCheck(task.Id, task.IsClosed)}
          task={task}
          name={task.Id}
          component={this.renderCheckBox}
          type="checkbox"
        />
      );
    });
  }
  render() {
    if (Object.values(this.props.tasks.data) === 0) {
      return <div>No Tasks</div>;
    }
    return (
      <div>
        <div
          className={
            this.props.tasks.isFetching ? "ui active inverted dimmer" : ""
          }
        >
          <div className="ui text loader">Loading</div>
        </div>
        <form className="ui middle aligned divided list">
          {this.renderTaskList()}
        </form>
        <div style={{ height: "40px" }}>
          <Link
            to={`/tasks/create/${this.props.id}`}
            style={{ backgroundColor: "#04A3E3", color: "white" }}
            className="ui right floated circular icon button"
          >
            <i className="icon add"></i>
          </Link>
        </div>
      </div>
    );
  }
}

TaskList = reduxForm({
  form: "taskForm",
})(TaskList);

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    enableReinitialize: true,
  };
};

export default connect(mapStateToProps, { fetchTasks, updateTask })(TaskList);
