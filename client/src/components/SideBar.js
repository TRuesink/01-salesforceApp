import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

class SideBar extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="ui card">
          <div className="content">
            <div className="center aligned author">
              <img
                className="ui small rounded image"
                src={user.data.photos.picture}
                alt="profPic"
              ></img>
            </div>
          </div>
          <div className="content">
            <Link to="/" className="center aligned header">
              {user.data.display_name}
            </Link>
            <div className="center aligned description">
              <p>{user.data.user_type}</p>
            </div>
          </div>
        </div>
        <div className="ui fluid vertical pointing menu">
          <NavLink to="/opportunities" className="item">
            Opportunities
          </NavLink>
          <NavLink to="/leads" className="item">
            Leads
          </NavLink>
          <NavLink to="/accounts" className="item">
            Accounts
          </NavLink>
          <NavLink to="/contacts" className="item">
            Contacts
          </NavLink>
          <NavLink to="/chatter" className="item">
            Chatter
          </NavLink>
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search"></input>
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SideBar);
