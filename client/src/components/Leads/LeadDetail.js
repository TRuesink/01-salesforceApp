import React from "react";
import { connect } from "react-redux";
import { changeEditMode, updateLead } from "../../actions";
import _ from "lodash";
import { EDIT, VIEW } from "../../actions/types";
import LeadForm from "./LeadForm";

class LeadDetail extends React.Component {
  componentDidMount() {
    this.props.changeEditMode(VIEW);
  }

  renderList() {
    const { lead } = this.props;
    const leadArray = Object.keys(lead)
      .filter((item) => item !== "attributes")
      .filter(
        (item) =>
          item === "FirstName" ||
          item === "LastName" ||
          item === "Description" ||
          item === "Email" ||
          item === "Phone" ||
          item === "Company" ||
          item === "Title" ||
          item === "Status" ||
          item === "Rating" ||
          item === "LeadSource"
      )
      .map((item) => {
        return { property: item, value: lead[item] };
      });
    return leadArray.map((prop) => {
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
    this.props.updateLead(this.props.lead.Id, formValues);
  };

  render() {
    return (
      <div>
        {this.props.editing ? (
          <LeadForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(
              this.props.lead,
              "FirstName",
              "LastName",
              "Description",
              "Email",
              "Phone",
              "Company",
              "Title",
              "Status",
              "Rating",
              "LeadSource"
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
  updateLead,
})(LeadDetail);
