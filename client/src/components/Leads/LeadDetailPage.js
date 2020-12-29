import React from "react";
import Path from "../Path";
import { connect } from "react-redux";
import {
  fetchMetadata,
  fetchLeads,
  updateLead,
  fetchTasks,
} from "../../actions";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import LeadDetail from "./LeadDetail";
import TaskList from "../Tasks/TaskList";

class LeadDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchLeads({ Id: this.props.match.params.id });
    this.props.fetchMetadata("Lead");

    this.props.fetchTasks({
      WhoId: this.props.match.params.id,
      select: "IsClosed,Id,Subject,ActivityDate,Description,WhatId,WhoId",
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
    if (!metadata.Lead) {
      return [];
    }
    const fields = metadata.Lead.fields;
    const picklistFields = fields.filter((field) => field.name === "Status");
    return _.mapKeys(picklistFields, "name").Status.picklistValues;
  }

  onSubmit = (formValues) => {
    this.props.updateLead(this.props.match.params.id, formValues);
  };

  render() {
    const { lead } = this.props;
    const leadId = this.props.match.params.id;

    return (
      <div>
        {Object.values(lead.data).length === 0 ? (
          <div style={{ height: "400px" }} className="ui basic segment">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        ) : (
          <div>
            <h1>{lead.data[leadId].Name}</h1>
            <div className="ui clearing divider"></div>
            <Path
              onSubmit={this.onSubmit}
              stages={this.getStages()}
              currentStage={lead.data[leadId].Status}
              pathType="Lead"
              isFetching={lead.isFetching}
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
                    <LeadDetail
                      lead={lead.data[leadId]}
                      isFetching={lead.isFetching}
                    />
                  ) : (
                    <TaskList
                      initialValues={this.getTaskValues()}
                      type="leads"
                      id={lead.data[leadId].Id}
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
    lead: state.leads,
    metadata: state.metadata,
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, {
  fetchMetadata,
  fetchLeads,
  updateLead,
  fetchTasks,
})(LeadDetailPage);
