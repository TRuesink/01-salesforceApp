import React from "react";
import SideBar from "./SideBar";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Import components
import LandingPage from "./LandingPage";
import LeadList from "./Leads/LeadList";
import DashboardPage from "./dashboard/DashboardPage";
import Header from "./Header";

import OppPage from "./Opportunities/OppPage";

//Import actions
import { getUser, fetchMetadata } from "../actions";
import OppDetail from "./Opportunities/OppDetail";
import OppCreate from "./Opportunities/OppCreate";
// import history object
import history from "../history";
import OppDetailPage from "./Opportunities/OppDetailPage";
import TaskCreate from "./Tasks/TaskCreate";

class App extends React.Component {
  renderContent() {
    const { user } = this.props;
    if (user.success === null) {
      this.props.getUser();
      return (
        <div style={{ height: "500px" }} className=" segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );
    } else if (user.success === false) {
      return (
        <div>
          <LandingPage />
        </div>
      );
    } else if (user.success === true) {
      return (
        <>
          <Header
            orgName={user.data.orgName}
            userName={user.data.display_name}
          />
          <div className="ui grid">
            <div className="four wide column">
              <SideBar />
            </div>
            <div className="twelve wide column">
              <Switch>
                <Route path="/" exact component={DashboardPage} />
                <Route path="/opportunities" exact component={OppPage} />
                <Route
                  path="/opportunities/create"
                  exact
                  component={OppCreate}
                />
                <Route path="/opportunities/:id" component={OppDetailPage} />
                <Route path="/leads" exact component={LeadList} />
                <Route path="/tasks/create/:id" exact component={TaskCreate} />
              </Switch>
            </div>
          </div>
        </>
      );
    }
  }
  render() {
    return (
      <div className="ui container">
        <Router history={history}>{this.renderContent()}</Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser, fetchMetadata })(App);
