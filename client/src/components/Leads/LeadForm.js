import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchMetadata } from "../../actions";

class LeadForm extends React.Component {
  componentDidMount() {
    this.props.fetchMetadata("Lead");
  }
  getPicklistFields() {
    const fields = this.props.metadata.Lead.fields;
    const picklistFields = fields.filter(
      (field) =>
        field.name === "Status" ||
        field.name === "LeadSource" ||
        field.name === "Rating"
    );
    return _.mapKeys(picklistFields, "name");
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

  renderDropdown = ({ value, picklist, input, label }) => {
    let options;
    options = picklist.picklistValues.map((item) => {
      return { key: item.value, text: item.value, value: item.value };
    });

    return (
      <div className="field">
        <label>{label}</label>
        <select {...input}>
          <option>Select a {label}</option>
          {options.map((item) => {
            return (
              <option key={item.key} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderForm() {
    const picklistFields = this.getPicklistFields();
    return (
      <form
        className={this.props.leads.isFetching ? "ui form loading" : "ui form"}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="scrolling content">
          <Field
            name="FirstName"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="LastName"
            component={this.renderInput}
            label="Last Name"
          />
          <Field
            name="Description"
            component={this.renderTextInput}
            label="Description"
          />
          <Field name="Email" component={this.renderInput} label="Email" />
          <Field
            name="Phone"
            component={this.renderInput}
            label="Phone Number"
          />
          <Field name="Company" component={this.renderInput} label="Company" />
          <Field name="Title" component={this.renderInput} label="Title" />
          <Field
            name="Status"
            component={this.renderDropdown}
            picklist={picklistFields.Status}
            label="Lead Status"
          />
          <Field
            name="Rating"
            component={this.renderDropdown}
            picklist={picklistFields.Rating}
            label="Rating"
          />
          <Field
            name="LeadSource"
            component={this.renderDropdown}
            picklist={picklistFields.LeadSource}
            label="Lead Source"
          />
          <button className="fluid ui button primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    if (!this.props.metadata.Lead) {
      return <div className="ui segment loading"></div>;
    }
    return <div>{this.renderForm()}</div>;
  }
}

LeadForm = reduxForm({
  form: "leadForm",
})(LeadForm);

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    leads: state.leads,
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
})(LeadForm);
