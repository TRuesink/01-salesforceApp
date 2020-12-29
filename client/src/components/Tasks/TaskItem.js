import React from "react";

class TaskItem extends React.Component {
  processDate(date) {
    const days = parseInt(
      (new Date(date) - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return days;
  }

  render() {
    const { title, date, input, taskKey } = this.props;
    return (
      <div key={taskKey} className="item">
        <div className="right floated content">
          {input.value === true ? (
            <div style={{ color: "green" }}>Task completed</div>
          ) : this.processDate(date) < 0 ? (
            <div style={{ color: "red" }}>{`${
              -1 * this.processDate(date)
            } days overdue`}</div>
          ) : (
            <div style={{ color: "orange" }}>{`Due in ${this.processDate(
              date
            )} days`}</div>
          )}
        </div>
        <div className="content">
          <div className="ui checkbox">
            <input {...input} type="checkbox"></input>
            <label>{title}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskItem;
