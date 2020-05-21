import React, { Component } from "react";
import ContainerHeader from '../../components/ContainerHeader';
import PaginateComponent from '../../containers/PaginateComponent';
import StaticCreateForm from './StaticCreateForm';
import StaticUpdateForm from './StaticUpdateForm';
// import CustomView from './CustomView';

import TestForm from "./TestForm";

class TestPagination extends Component {
  render() {
    const { match } = this.props;

    const columnsToDisplay = [
      { id: "name", disablePadding: true, label: "Name", type: 'string' },
      { id: "description", disablePadding: false, label: "Description", type: 'string' },
      { id: "minUser", disablePadding: false, label: "Minimum Users", type: 'numeric' },
      { id: "maxUser", disablePadding: false, label: "Maximum Users",type: 'numeric' },
      {
        id: "defaultCycleDuration",
        disablePadding: false,
        label: "Default Cycle Duration"
      }
    ];

    const fieldsToCreate = [
      {
        id: "name",
        label: "Name",
        type: "textfield",
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "description",
        label: "Description",
        type: "textfield",
        multiline: true,
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "minUser",
        label: "Minimum User",
        type: "number",
        rules: {
          required: true,
          numeric: true
        }
      },
      {
        id: "maxUser",
        label: "Maximum User",
        type: "number",
        rules: {
          required: true,
          numeric: true
        }
      },
      {
        id: "defaultCycleDuration",
        label: "Default Cycle Duration",
        type: "textfield",
        rules: {
          required: true,
          string: true,
          match: {
            match: /\d+(d|w|m)/,
            message: "Must match this format: [1d, 2d, 1w, 2w, 1m, 2m]"
          }
        }
      },
      {
        id: "hasMaturityDate",
        label: "Has Maturity Date",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedIndividualAmount",
        label: "Has Fixed Individual Amount",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedGroupAmount",
        label: "Has Fixed Group Amount",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "isAutomatedCycle",
        label: "Has Automated Cycle",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "hasRollingBeneficiary",
        label: "Has Rolling Beneficiary",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedDefaultCycle",
        label: "Has Fixed Default Cycle",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "canJoinClosedGroup",
        label: "Can Join Closed Group",
        type: "radio",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" }
        ],
        rules: {
          required: true
        }
      },
      {
        id: "config",
        label: "JSON Configuration",
        type: "jsonarea",
        rules: {
          required: true,
          json: true
        }
      }
    ];

    const autoFields = ["id", "createdAt", "updatedAt"];

    // -------------------------- STATIC FORM ---------------------------------------- //

    // Parameters Needed
    // - columnsToDisplay
    // staticFormRules without field type

    const staticFormRules = [
      {
        id: "name",
        label: "Name",
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "description",
        label: "Description",
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "minUser",
        label: "Minimum User",
        rules: {
          required: true,
          numeric: true
        }
      },
      {
        id: "maxUser",
        label: "Maximum User",
        rules: {
          required: true,
          numeric: true
        }
      },
      {
        id: "defaultCycleDuration",
        label: "Default Cycle Duration",
        rules: {
          required: true,
          string: true,
          match: {
            match: /\d+(d|w|m)/,
            message: "Must match this format: [1d, 2d, 1w, 2w, 1m, 2m]"
          }
        }
      },
      {
        id: "hasMaturityDate",
        label: "Has Maturity Date",
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedIndividualAmount",
        label: "Has Fixed Individual Amount",
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedGroupAmount",
        label: "Has Fixed Group Amount",
        rules: {
          required: true
        }
      },
      {
        id: "isAutomatedCycle",
        label: "Has Automated Cycle",
        rules: {
          required: true
        }
      },
      {
        id: "hasRollingBeneficiary",
        label: "Has Rolling Beneficiary",
        rules: {
          required: true
        }
      },
      {
        id: "hasFixedDefaultCycle",
        label: "Has Fixed Default Cycle",
        rules: {
          required: true
        }
      },
      {
        id: "canJoinClosedGroup",
        label: "Can Join Closed Group",
        rules: {
          required: true
        }
      },
      {
        id: "config",
        label: "JSON Configuration",
        rules: {
          required: true,
          json: true
        }
      }
    ];

        return (
            <div className='create-fgt-wrapper'>
                <ContainerHeader match={match} title='Funding Group Types'/>

                <PaginateComponent
                    // columnToOrderBy={columnsToDisplay[2].id}
                    rowsPerPage={5}
                    tableKey={columnsToDisplay[0].id}
                    uniqueRoleIdentifier='id'
                    fields={columnsToDisplay}
                    fieldsToCreate={fieldsToCreate}
                    fieldsToUpdate={fieldsToCreate}
                    autoFields={autoFields}
                    tableHeading='Funding Group Types'
                    baseEntityAPI='fundinggrouptypes/v1'
                    FormComponent={StaticCreateForm}
                    NewPageFormComponent={TestForm}
                    UpdateFormComponent={StaticUpdateForm}
                    // CustomViewComponent={CustomView}
                    // templateCases={['static-create-form', 'static-update-form]}
                    // templateCases={["new-page-form"]}
                    // templateCases={['custom-view']}
                    templateCases={[]}
                    fieldRules={staticFormRules}
                />

            </div>
        )
    }
}

export default TestPagination;
