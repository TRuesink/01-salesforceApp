import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchMetadata } from "../../actions";

class AccountForm extends React.Component {
  componentDidMount() {
    this.props.fetchMetadata("Account");
  }
  getPicklistFields() {
    const fields = this.props.metadata.Account.fields;
    const picklistFields = fields.filter(
      (field) =>
        field.name === "Type" ||
        field.name === "Industry" ||
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
        className={
          this.props.accounts.isFetching ? "ui form loading" : "ui form"
        }
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="scrolling content">
          <Field
            name="Name"
            component={this.renderInput}
            label="Account Name"
          />
          <Field name="Website" component={this.renderInput} label="Website" />
          <Field
            name="Description"
            component={this.renderTextInput}
            label="Description"
          />
          <Field
            name="AnnualRevenue"
            component={this.renderInput}
            label="Annual Revenue"
          />
          <Field
            name="Type"
            component={this.renderDropdown}
            picklist={picklistFields.Type}
            label="Customer Type"
          />
          <Field
            name="Rating"
            component={this.renderDropdown}
            picklist={picklistFields.Rating}
            label="Rating"
          />
          <Field
            name="Industry"
            component={this.renderDropdown}
            picklist={picklistFields.Industry}
            label="Industry"
          />
          <button className="fluid ui button primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    if (!this.props.metadata.Account) {
      return <div className="ui segment loading"></div>;
    }
    return <div>{this.renderForm()}</div>;
  }
}

AccountForm = reduxForm({
  form: "accountForm",
})(AccountForm);

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
})(AccountForm);
