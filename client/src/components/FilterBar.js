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
    const titles = ["AccountId", "Contact", "Lead", "Opportunity", "Funnel"];
    for (let i = 0; i < 5; i++) {
      if (categories[i] !== null) {
        categories[i].title = titles[i];
      }
    }

    return categories.map((cat) => {
      if (cat !== null) {
        const title = cat.title;
        return (
          <div className="field">
            <Field
              name={title}
              component={this.renderInput}
              placeholder={title}
              options={Object.values(cat).map((item) => {
                return { key: item.Id, text: item.Name, value: item.Id };
              })}
            />
          </div>
        );
      }
    });
  }

  onSubmit = (formValues) => {
    this.props.onSelectFilter(formValues);
  };

  render() {
    console.log(history);
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
