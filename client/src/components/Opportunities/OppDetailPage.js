import React from "react";
import Path from "../Path";
import { connect } from "react-redux";
import {
  fetchMetadata,
  fetchOpportunities,
  updateOpportunity,
  fetchTasks,
} from "../../actions";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import OppDetail from "./OppDetail";
import TaskList from "../Tasks/TaskList";

class OppDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities({ Id: this.props.match.params.id });
    this.props.fetchMetadata("Opportunity");

    this.props.fetchTasks({
      WhatId: this.props.match.params.id,
      select: "IsClosed,Id,Subject,ActivityDate,Description,WhatId",
    });
  }

  getTaskValues() {
    let initialTaskValues = {};
    const tasks = this.props.tasks.data;
    Object.values(tasks).map((task) => {
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
    const oppId = this.props.match.params.id;

    return (
      <div>
        {Object.values(opportunity.data).length === 0 ? (
          <div style={{ height: "400px" }} className="ui basic segment">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        ) : (
          <div>
            <h1>{opportunity.data[oppId].Name}</h1>
            <div className="ui clearing divider"></div>
            <Path
              onSubmit={this.onSubmit}
              stages={this.getStages()}
              currentStage={opportunity.data[oppId].StageName}
              pathType="Opportunity"
              isFetching={opportunity.isFetching}
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
                    <OppDetail
                      opportunity={opportunity.data[oppId]}
                      isFetching={opportunity.isFetching}
                    />
                  ) : (
                    <TaskList
                      initialValues={this.getTaskValues()}
                      id={opportunity.data[oppId].Id}
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
    opportunity: state.opportunities,
    metadata: state.metadata,
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
  fetchOpportunities,
  updateOpportunity,
  fetchTasks,
})(OppDetailPage);
