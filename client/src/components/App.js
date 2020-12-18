import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

// import history object
import history from "../history";

// Import components
import LandingPage from "./LandingPage";
import LeadList from "./Leads/LeadList";
import DashboardPage from "./dashboard/DashboardPage";
import Header from "./Header";
import SideBar from "./SideBar";
import OppPage from "./Opportunities/OppPage";

//Import actions
import { getUser } from "../actions";

class App extends React.Component {
  componentDidMount() {
    console.log("component mounted");
  }

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
        <Router history={history}>
          <Header
            orgName={user.data.orgName}
            userName={user.data.display_name}
          />
          <div className="ui grid">
            <div className="four wide column">
              <SideBar />
            </div>
            <div className="twelve wide column">
              <Route path="/" exact component={DashboardPage} />
              <Route path="/Opportunities" exact component={OppPage} />
              <Route path="/Leads" exact component={LeadList} />
            </div>
          </div>
        </Router>
      );
    }
  }
  render() {
    return <div className="ui container">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser })(App);
