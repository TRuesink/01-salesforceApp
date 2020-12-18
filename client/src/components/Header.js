import React from "react";
import { connect } from "react-redux";
import { signOut } from "../actions";
import salesforceLogo from "../static/images/salesforceLogo.png";

class Header extends React.Component {
  onSignOut = () => {
    this.props.signOut();
  };
  render() {
    return (
      <div className="ui segment">
        <div className="ui secondary stackable menu">
          <div className="item">
            <img src={salesforceLogo}></img>
            <div style={{ marginLeft: "20px" }}>{this.props.orgName}</div>
          </div>
          <div className="right menu">
            <div className="item">
              <div style={{ marginRight: "20px" }}>
                Hi {this.props.userName}
              </div>
              <button
                onClick={this.onSignOut}
                style={{ backgroundColor: "#04A3E3", color: "white" }}
                className="ui primary button"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signOut })(Header);
