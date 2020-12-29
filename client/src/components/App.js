import React from "react";
import SideBar from "./SideBar";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Import components
import LandingPage from "./LandingPage";
import DashboardPage from "./dashboard/DashboardPage";
import Header from "./Header";

import OppPage from "./Opportunities/OppPage";

//Import actions
import { getUser, fetchMetadata } from "../actions";
import OppCreate from "./Opportunities/OppCreate";
// import history object
import history from "../history";
import OppDetailPage from "./Opportunities/OppDetailPage";
import TaskCreate from "./Tasks/TaskCreate";
import LeadPage from "./Leads/LeadPage";
import LeadCreate from "./Leads/LeadCreate";
import LeadDetailPage from "./Leads/LeadDetailPage";
import AccountPage from "./Accounts/AccountPage";
import AccountCreate from "./Accounts/AccountCreate";
import AccountDetailPage from "./Accounts/AccountDetailPage";

class App extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.success === true && this.props.user.success === null) {
      this.props.getUser();
    }
  }

  renderContent() {
    const { user } = this.props;
    if (user.success === null) {
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
                <Route path="/leads" exact component={LeadPage} />
                <Route path="/leads/create" exact component={LeadCreate} />
                <Route path="/leads/:id" component={LeadDetailPage} />
                <Route
                  path="/tasks/create/:type/:id"
                  exact
                  component={TaskCreate}
                />
                <Route path="/accounts" exact component={AccountPage} />
                <Route
                  path="/accounts/create"
                  exact
                  component={AccountCreate}
                />
                <Route path="/accounts/:id" component={AccountDetailPage} />
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
