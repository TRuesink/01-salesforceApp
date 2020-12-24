import React from "react";
import { connect } from "react-redux";
import { fetchTasks, updateTask } from "../../actions";
import TaskItem from "./TaskItem";
import { reduxForm, Field } from "redux-form";

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
    return this.props.tasks.map((task) => {
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
    if (this.props.tasks.length === 0) {
      return <div>No Tasks</div>;
    }
    return (
      <form className="ui middle aligned divided list">
        {this.renderTaskList()}
      </form>
    );
  }
}

TaskList = reduxForm({
  form: "taskForm",
})(TaskList);

const mapStateToProps = (state) => {
  return {
    tasks: Object.values(state.tasks),
    enableReinitialize: true,
  };
};

export default connect(mapStateToProps, { fetchTasks, updateTask })(TaskList);
