import React from "react";
import { reduxForm, Field } from "redux-form";

class TaskForm extends React.Component {
  renderDateInput({ label, input, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type="date"></input>
      </div>
    );
  }
  renderInput({ label, input, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} placeholder={label}></input>
      </div>
    );
  }
  renderTextInput({ label, input, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} rows="2" className=""></textarea>
      </div>
    );
  }
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="Subject" component={this.renderInput} label="Subject" />
        <Field
          name="Description"
          component={this.renderTextInput}
          label="Description"
        />
        <Field
          name="ActivityDate"
          component={this.renderDateInput}
          label="Due Date"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "taskForm",
})(TaskForm);
