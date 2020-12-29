import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import history from "../history";

import "../static/css/filterBar.css";

class FilterBar extends React.Component {
  renderInput({ label, input, meta }) {
    return (
      <div className="ui transparent icon input">
        <input {...input} placeholder={label}></input>
      </div>
    );
  }

  renderSearchForm() {
    return <Field name="search" component={this.renderInput} label="Search" />;
  }

  onSubmit = (formValues) => {
    this.props.onSelectFilter(formValues.search);
  };

  render() {
    return (
      <div className="ui menu">
        <div className="item">
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            {this.renderSearchForm()}
          </form>
        </div>
        <div className="right item">
          <Link
            to={`${history.location.pathname}/create`}
            style={{ backgroundColor: "#04A3E3", color: "white" }}
            className="ui button primary"
          >
            New
          </Link>
        </div>
      </div>
    );
  }
}

FilterBar = reduxForm({
  form: "filterForm",
})(FilterBar);

const mapStateToProps = (state) => {
  return {
    filterMenuStatus: state.filterMenuStatus,
  };
};

export default connect(mapStateToProps)(FilterBar);
