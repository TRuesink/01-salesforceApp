import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchAccounts, fetchMetadata } from "../../actions";

class ContactForm extends React.Component {
  componentDidMount() {
    this.props.fetchMetadata("Contact");
    this.props.fetchAccounts({ limit: 1000, sort: "Name", select: "Id,Name" });
  }
  getPicklistFields() {
    const fields = this.props.metadata.Contact.fields;
    const picklistFields = fields.filter(
      (field) => field.name === "LeadSource"
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

  renderDropdown = ({ picklist, input, label }) => {
    let options;

    if (!picklist) {
      options = Object.values(this.props.accounts.data)
        .filter((item) => typeof item === "object")
        .map((item) => {
          return { key: item.Id, text: item.Name, value: item.Id };
        });
    } else {
      options = picklist.picklistValues.map((item) => {
        return { key: item.value, text: item.value, value: item.value };
      });
    }
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
        className={
          this.props.contacts.isFetching ? "ui form loading" : "ui form"
        }
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
            name="AccountId"
            component={this.renderDropdown}
            label="Account Name"
          />
          <Field
            name="Description"
            component={this.renderTextInput}
            label="Description"
          />
          <Field name="Title" component={this.renderInput} label="Title" />
          <Field
            name="Department"
            component={this.renderInput}
            label="Department"
          />
          <Field
            name="LeadSource"
            component={this.renderDropdown}
            picklist={picklistFields.LeadSource}
            label="Lead Source"
          />
          <Field
            name="Phone"
            component={this.renderInput}
            label="Phone Number"
          />
          <Field name="Mobile" component={this.renderInput} label="Mobile" />
          <Field name="Email" component={this.renderInput} label="Email" />

          <button className="fluid ui button primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    if (this.props.accounts.isFetching || !this.props.metadata.Contact) {
      return <div className="ui segment loading"></div>;
    }
    return <div>{this.renderForm()}</div>;
  }
}

ContactForm = reduxForm({
  form: "contactForm",
})(ContactForm);

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    accounts: state.accounts,
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  fetchMetadata,
})(ContactForm);
