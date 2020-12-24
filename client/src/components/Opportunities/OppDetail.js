import React from "react";
import Path from "../Path";
import { connect } from "react-redux";
import {
  fetchMetadata,
  fetchOpportunities,
  changeEditMode,
  updateOpportunity,
  changeLoadingStatus,
} from "../../actions";
import _ from "lodash";
import { EDIT, NOT_LOADING, VIEW } from "../../actions/types";
import OppForm from "./OppForm";

class OppDetail extends React.Component {
  componentDidMount() {
    this.props.changeEditMode(VIEW);
  }

  renderList() {
    const { opportunity } = this.props;
    const oppArray = Object.keys(opportunity)
      .filter((item) => item !== "attributes")
      .filter(
        (item) =>
          item === "Name" ||
          item === "Description" ||
          item === "StageName" ||
          item === "Amount" ||
          item === "Probability" ||
          item === "CloseDate" ||
          item === "Type" ||
          item === "LeadSource" ||
          item === "OwnerId" ||
          item === "AccountId"
      )
      .map((item) => {
        return { property: item, value: opportunity[item] };
      });
    return oppArray.map((prop) => {
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
    this.props.updateOpportunity(this.props.opportunity.Id, formValues);
  };

  render() {
    return (
      <div>
        {this.props.editing ? (
          <OppForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(
              this.props.opportunity,
              "Name",
              "Description",
              "StageName",
              "Amount",
              "Probability",
              "CloseDate",
              "Type",
              "LeadSource",
              "AccountId"
            )}
          />
        ) : (
          <div className="ui relaxed divided list">{this.renderList()}</div>
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
  updateOpportunity,
})(OppDetail);
