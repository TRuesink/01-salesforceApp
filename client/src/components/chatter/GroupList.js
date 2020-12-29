import React from "react";
import { connect } from "react-redux";
import { fetchGroups } from "../../actions";
import GroupItem from "./GroupItem";

class GroupList extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
  }
  renderSearchBar() {
    return (
      <div className="ui menu">
        <div className="item">
          <h2>Groups</h2>
        </div>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search..."></input>
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderGroupItems() {
    const groupData = this.props.chatter.groups;
    return Object.values(groupData).map((group) => {
      return (
        <GroupItem
          img={group.photo.mediumPhotoUrl}
          groupName={group.name}
          memberCount={group.memberCount}
          description={group.description}
        />
      );
    });
  }
  render() {
    if (
      this.props.chatter.isFetching ||
      Object.values(this.props.chatter.groups).length === 0
    ) {
      return <div className="ui active centered inline loader"></div>;
    }
    return (
      <div>
        {this.renderSearchBar()}
        <div className="ui segment">
          <div className="ui divided list">{this.renderGroupItems()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chatter: state.chatter,
  };
};

export default connect(mapStateToProps, { fetchGroups })(GroupList);
