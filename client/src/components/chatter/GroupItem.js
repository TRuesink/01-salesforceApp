import React from "react";
import { Link } from "react-router-dom";

class GroupItem extends React.Component {
  render() {
    return (
      <div className="item">
        <img
          className="ui avatar image"
          src={this.props.img}
          alt="group photo"
        ></img>
        <div className="content">
          <Link to="#" className="header">
            {this.props.groupName}
          </Link>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

export default GroupItem;
