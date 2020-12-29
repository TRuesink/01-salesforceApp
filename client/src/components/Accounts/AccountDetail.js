import React from "react";
import { connect } from "react-redux";
import { changeEditMode, updateAccount } from "../../actions";
import _ from "lodash";
import { EDIT, VIEW } from "../../actions/types";
import AccountForm from "./AccountForm";

class AccountDetail extends React.Component {
  componentDidMount() {
    this.props.changeEditMode(VIEW);
  }

  renderList() {
    const { account } = this.props;
    const accountArray = Object.keys(account)
      .filter((item) => item !== "attributes")
      .filter(
        (item) =>
          item === "Name" ||
          item === "Website" ||
          item === "Description" ||
          item === "AnnualRevenue" ||
          item === "Type" ||
          item === "Rating" ||
          item === "Industry"
      )
      .map((item) => {
        return { property: item, value: account[item] };
      });
    return accountArray.map((prop) => {
      return (
        <div key={prop.property} className="item">
          <div className="right floated content">
            <div
              onClick={() => this.props.changeEditMode(EDIT)}
              className="ui button"
            >
              Edit
            </div>
          </div>
          <div className="content">
            <div className="header">{prop.property}</div>
            {prop.value}
          </div>
        </div>
      );
    });
  }

  onSubmit = (formValues) => {
    this.props.updateAccount(this.props.account.Id, formValues);
  };

  render() {
    return (
      <div>
        {this.props.editing ? (
          <AccountForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(
              this.props.account,
              "Name",
              "Website",
              "Description",
              "AnnualRevenue",
              "Type",
              "Rating",
              "Industry"
            )}
          />
        ) : (
          <div>
            <div
              className={
                this.props.isFetching ? "ui active inverted dimmer" : ""
              }
            >
              <div className="ui text loader">Loading</div>
            </div>
            <div className="ui relaxed divided list">{this.renderList()}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editing: state.editing,
  };
};

export default connect(mapStateToProps, {
  changeEditMode,
  updateAccount,
})(AccountDetail);
