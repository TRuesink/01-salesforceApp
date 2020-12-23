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
    this.props.fetchMetadata("Opportunity");
    this.props.fetchOpportunities({ Id: this.props.match.params.id });
    this.props.changeEditMode(VIEW);
    this.props.changeLoadingStatus(NOT_LOADING);
  }

  getStages() {
    const { metadata } = this.props;
    if (!metadata.Opportunity) {
      return [];
    }
    const fields = metadata.Opportunity.fields;
    const picklistFields = fields.filter((field) => field.name === "StageName");
    return _.mapKeys(picklistFields, "name").StageName.picklistValues;
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
    this.props.updateOpportunity(this.props.match.params.id, formValues);
  };

  render() {
    const { opportunity } = this.props;
    return (
      <div>
        {!opportunity ? (
          <div style={{ height: "400px" }} className="ui basic segment">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        ) : (
          <div>
            <h1>{opportunity.Name}</h1>
            <div className="ui clearing divider"></div>
            <Path
              onSubmit={this.onSubmit}
              stages={this.getStages()}
              currentStage={opportunity.StageName}
              pathType="Opportunity"
            />
            <div className="ui segment">
              <h3>Details</h3>
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
                <div className="ui relaxed divided list">
                  {this.renderList()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    opportunity: state.opportunities.data[ownProps.match.params.id],
    metadata: state.metadata,
    editing: state.editing,
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
  fetchOpportunities,
  changeEditMode,
  updateOpportunity,
  changeLoadingStatus,
})(OppDetail);
