import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import {
  changeLoadingStatus,
  fetchAccounts,
  fetchMetadata,
} from "../../actions";
import { LOADING, NOT_LOADING } from "../../actions/types";

class OppForm extends React.Component {
  componentDidMount() {
    this.props.fetchMetadata("Opportunity");
    this.props.fetchAccounts();
    this.props.changeLoadingStatus(NOT_LOADING);
  }
  getPicklistFields() {
    const picklistFields = this.props.fields.filter(
      (field) =>
        field.name === "StageName" ||
        field.name === "LeadSource" ||
        field.name === "Type"
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

  renderDateInput({ label, input, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type="date"></input>
      </div>
    );
  }

  renderDropdown = ({ value, picklist, input, label }) => {
    let options;

    if (!picklist) {
      options = Object.values(this.props.accounts)
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
          <option>test 2</option>
        </select>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.changeLoadingStatus(LOADING);
  };

  renderForm() {
    const picklistFields = this.getPicklistFields();
    return (
      <form
        className={this.props.loadingStatus ? "ui form loading" : "ui form"}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="scrolling content">
          <Field
            name="AccountId"
            component={this.renderDropdown}
            label="Account Name"
          />
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
            component={this.renderDropdown}
            picklist={picklistFields.StageName}
            label="Stage Name"
          />
          <Field name="Amount" component={this.renderInput} label="Amount" />
          <Field
            name="Probability"
            component={this.renderInput}
            label="Probability"
          />
          <Field
            name="CloseDate"
            component={this.renderDateInput}
            label="Close Date"
          />
          <Field
            name="Type"
            component={this.renderDropdown}
            picklist={picklistFields.Type}
            label="Type"
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
    if (Object.keys(this.props.accounts).length === 0) {
      return <div className="ui segment loading"></div>;
    }
    return <div>{this.renderForm()}</div>;
  }
}

OppForm = reduxForm({
  form: "oppForm",
})(OppForm);

const mapStateToProps = (state) => {
  return {
    fields: state.metadata.Opportunity.fields,
    loadingStatus: state.loadingStatus,
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps, {
  changeLoadingStatus,
  fetchAccounts,
  fetchMetadata,
})(OppForm);
