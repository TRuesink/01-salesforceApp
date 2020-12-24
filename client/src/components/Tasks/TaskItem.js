import React from "react";

class TaskItem extends React.Component {
  processDate(date) {
    const days = parseInt(
      (new Date(date) - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) {
      return `${-1 * days} days overdue`;
    }
    return `Due in ${days} days`;
  }

  render() {
    const { title, description, date, input, value } = this.props;
    return (
      <div className="item">
        <div className="right floated content">
          <div>{this.processDate(date)}</div>
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
