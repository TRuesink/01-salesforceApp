import React from "react";
import Path from "../Path";
import { connect } from "react-redux";
import {
  fetchMetadata,
  fetchOpportunities,
  changeLoadingStatus,
  updateOpportunity,
  fetchTasks,
} from "../../actions";
import _ from "lodash";
import { NOT_LOADING } from "../../actions/types";
import { NavLink } from "react-router-dom";
import OppDetail from "./OppDetail";
import TaskList from "../Tasks/TaskList";

class OppDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchMetadata("Opportunity");
    this.props.fetchOpportunities({ Id: this.props.match.params.id });
    this.props.changeLoadingStatus(NOT_LOADING);
    this.props.fetchTasks({
      WhatId: this.props.match.params.id,
      select: "IsClosed,Id,Subject,ActivityDate,Description,WhatId",
    });
  }

  getTaskValues() {
    // if (this.props.tasks.length === 0) {
    //   return;
    // }
    let initialTaskValues = {};
    this.props.tasks.map((task) => {
      return (initialTaskValues[task.Id] = task.IsClosed);
    });
    return initialTaskValues;
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
              <div>
                <div className="ui top attached tabular menu">
                  <NavLink
                    to={`${this.props.match.url}/details`}
                    className="item"
                  >
                    Details
                  </NavLink>
                  <NavLink
                    to={`${this.props.match.url}/tasks`}
                    className="item"
                  >
                    Tasks
                  </NavLink>
                </div>
                <div className="ui bottom attached segment">
                  {this.props.location.pathname ===
                  `${this.props.match.url}/details` ? (
                    <OppDetail opportunity={opportunity} />
                  ) : (
                    <TaskList
                      initialValues={this.getTaskValues()}
                      id={opportunity.Id}
                    />
                  )}
                </div>
              </div>
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
    tasks: Object.values(state.tasks),
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
  fetchOpportunities,
  changeLoadingStatus,
  updateOpportunity,
  fetchTasks,
})(OppDetailPage);
