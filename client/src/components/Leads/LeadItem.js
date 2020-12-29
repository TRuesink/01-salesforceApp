import React from "react";
import { Link } from "react-router-dom";

class LeadItem extends React.Component {
  render() {
    const { lead } = this.props;
    return (
      <tr key={lead.Id}>
        <td data-label="Name">
          <Link to={`/leads/${lead.Id}/details`}>{lead.Name}</Link>
        </td>
        <td data-label="Status">{lead.Status}</td>
        <td data-label="Company">{lead.Company}</td>
        <td data-label="Title">{lead.Title}</td>
      </tr>
    );
  }
}

export default LeadItem;
