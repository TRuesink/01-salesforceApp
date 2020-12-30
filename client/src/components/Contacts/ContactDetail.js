import React from "react";
import { connect } from "react-redux";
import { changeEditMode, updateContact } from "../../actions";
import _ from "lodash";
import { EDIT, VIEW } from "../../actions/types";
import ContactForm from "./ContactForm";

class ContactDetail extends React.Component {
  componentDidMount() {
    this.props.changeEditMode(VIEW);
  }

  renderList() {
    const { contact } = this.props;
    const contactArray = Object.keys(contact)
      .filter((item) => item !== "attributes")
      .filter(
        (item) =>
          item === "FirstName" ||
          item === "LastName" ||
          item === "AccountId" ||
          item === "Description" ||
          item === "Title" ||
          item === "Department" ||
          item === "LeadSource" ||
          item === "Phone" ||
          item === "Mobile" ||
          item === "Email"
      )
      .map((item) => {
        return { property: item, value: contact[item] };
      });
    return contactArray.map((prop) => {
      return (
        <div key={prop.property} className="item">
          <div className="right floated content">
            <div
              onClick={() => this.props.changeEditMode(EDIT)}
              className="ui button"
            >
              Edit
            </div>
          </div>
          <div className="content">
            <div className="header">{prop.property}</div>
            {prop.value}
          </div>
        </div>
      );
    });
  }

  onSubmit = (formValues) => {
    this.props.updateContact(this.props.contact.Id, formValues);
  };

  render() {
    return (
      <div>
        {this.props.editing ? (
          <ContactForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(
              this.props.contact,
              "FirstName",
              "LastName",
              "AccountId",
              "Description",
              "Title",
              "Department",
              "LeadSource",
              "Phone",
              "Mobile",
              "Email"
            )}
          />
        ) : (
          <div>
            <div
              className={
                this.props.isFetching ? "ui active inverted dimmer" : ""
              }
            >
              <div className="ui text loader">Loading</div>
            </div>
            <div className="ui relaxed divided list">{this.renderList()}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editing: state.editing,
  };
};

export default connect(mapStateToProps, {
  changeEditMode,
  updateContact,
})(ContactDetail);
