import React from "react";
import { NavLink } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";

class TabMenu extends React.Component {
  render() {
    const { id, type } = this.props;
    console.log(history);
    return (
      <div>
        <div className="ui top attached tabular menu">
          <NavLink to={`/${type}/${id}/details`} className="item">
            Details
          </NavLink>
          <NavLink to={`/${type}/${id}/tasks`} className="item">
            Tasks
          </NavLink>
        </div>
        <div className="ui bottom attached segment">
          <p>test</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    info: ownProps,
  };
};

export default connect(null)(TabMenu);
