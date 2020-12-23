import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { Dropdown } from "semantic-ui-react";
import history from "../history";

import "../static/css/filterBar.css";

class FilterBar extends React.Component {
  renderInput = (props) => {
    return (
      <Dropdown
        key={1}
        onChange={(e, { value }) => props.input.onChange(value)}
        clearable
        placeholder={props.placeholder}
        selection
        options={props.options}
        value={props.value}
      />
    );
  };

  renderContent() {
    const { accounts, contacts, leads, opps, funnels } = this.props;
    const temp = { accounts, contacts, leads, opps, funnels };
    const categories = Object.values({ ...temp });
    const testForRender = categories
      .filter((item) => item !== undefined)
      .every((item) => Object.keys(item).length !== 0);
    const titles = ["AccountId", "Contact", "Lead", "Opportunity", "Funnel"];
    for (let i = 0; i < 5; i++) {
      if (categories[i] !== undefined) {
        categories[i].title = titles[i];
      }
    }
    if (testForRender) {
      return categories.map((cat, index) => {
        if (cat !== undefined) {
          const title = cat.title;

          const options = Object.values(cat)
            .filter((item) => typeof item === "object")
            .map((item) => {
              return { key: item.Id, text: item.Name, value: item.Id };
            });
          return (
            <div key={cat.title} className="field">
              <Field
                name={title}
                component={this.renderInput}
                placeholder={title}
                options={options}
              />
            </div>
          );
        }
        return <div key={"undefinedCat" + index}></div>;
      });
    }
    return <div key={1} className="field loading segment"></div>;
  }

  onSubmit = (formValues) => {
    this.props.onSelectFilter(formValues);
  };

  render() {
    return (
      <div className="ui menu">
        <div className="item">
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="filter-bar-form inline fields">
              <label>Filter</label>
              {this.renderContent()}
              <div className="field">
                <button
                  style={{ backgroundColor: "#04A3E3", color: "white" }}
                  className="ui button primary"
                >
                  Filter
                </button>
              </div>
            </div>
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
