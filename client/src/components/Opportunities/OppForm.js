import React from "react";
import { Field, reduxForm } from "redux-form";

class OppForm extends React.Component {
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
      <div class="field">
        <label>{label}</label>
        <textarea {...input} rows="2" class=""></textarea>
      </div>
    );
  }

  render() {
    return (
      <form className="ui internally celled two column grid">
        <div className="column">
          <div className="ui form">
            <Field
              name="Name"
              component={this.renderInput}
              label="Opportunity Name"
            />
            <Field
              name="Description"
              component={this.renderTextInput}
              label="Description"
            />
            <Field
              name="StageName"
              component={this.renderInput}
              label="Stage"
            />
            <Field name="Amount" component={this.renderInput} label="Amount" />
            <Field
              name="Probability"
              component={this.renderInput}
              label="Probability"
            />
          </div>
        </div>
        <div className="column">
          <div className="ui form">
            <Field
              name="CloseDate"
              component={this.renderInput}
              label="Close Date"
            />
            <Field
              name="LeadSource"
              component={this.renderInput}
              label="Lead Source"
            />
            <Field name="Type" component={this.renderInput} label="Type" />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "oppForm",
})(OppForm);
