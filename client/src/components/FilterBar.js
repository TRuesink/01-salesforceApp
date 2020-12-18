import React from "react";
import { connect } from "react-redux";
import { changeMenu } from "../actions";
import { CLICK } from "../actions/types";
import { reduxForm, Field } from "redux-form";
import { Dropdown } from "semantic-ui-react";

import "../static/css/filterBar.css";

const options = [
  { key: "placeholder", text: "", value: "" },
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" },
];

class FilterBar extends React.Component {
  renderInput(props) {
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
  }

  renderContent() {
    const { accounts, contacts, leads, opps, funnels } = this.props;
    const temp = { accounts, contacts, leads, opps, funnels };
    const categories = Object.values({ ...temp });
    const titles = ["Account", "Contact", "Lead", "Opportunity", "Funnel"];
    console.log(categories);
    for (let i = 0; i < 5; i++) {
      if (categories[i] !== null) {
        categories[i].title = titles[i];
      }
    }
    console.log(categories);
    return categories.map((cat) => {
      if (cat !== null) {
        const title = cat.title;
        return (
          <div className="item">
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

  render() {
    return (
      <div className="ui menu">
        <div className="header item">Filter</div>
        {this.renderContent()}
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

export default connect(mapStateToProps, { changeMenu })(FilterBar);
