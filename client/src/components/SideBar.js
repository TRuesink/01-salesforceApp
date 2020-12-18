import React from "react";
import { connect } from "react-redux";

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
              ></img>
            </div>
          </div>
          <div className="content">
            <a className="center aligned header">{user.data.display_name}</a>
            <div className="center aligned description">
              <p>{user.data.user_type}</p>
            </div>
          </div>
        </div>
        <div className="ui fluid vertical pointing menu">
          <a className="active item">Opportunities</a>
          <a className="item">Leads</a>
          <a className="item">Accounts</a>
          <a className="item">Contacts</a>
          <a className="item">Tasks</a>
          <a className="item">Funnels</a>
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
