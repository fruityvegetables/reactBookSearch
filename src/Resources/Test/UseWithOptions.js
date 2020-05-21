import React from "react";
import ContainerHeader from '../../components/ContainerHeader';
import PaginateComponent from '../../containers/PaginateComponent';
import CustomView from './CustomView';

const Clients = ({ match }) => {

    const columnsToDisplay = [
      { 
        id: "name",
        disablePadding: true,
        label: "Name",
        type: "string"
      },
      { 
        id: "clientId",
        disablePadding: false,
        label: "Client Id",
        type: "string"
      },
      {
        id: "appClient",
        disablePadding: false,
        label: "Client Secret",
        type: "string"
      },
      {
        id: "callBackUrl",
        disablePadding: false,
        label: "Client Callback Url",
        type: "string"
      },
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
        id: "clientId",
        label: "Client Id",
        type: "textfield",
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "appClient",
        label: "Client Secret",
        type: "textfield",
        rules: {
          required: true,
          string: true
        }
      },
      {
        id: "callBackUrl",
        label: "Client Callback Url",
        type: "textfield",
        rules: {
          required: true,
          string: true
        }
      }
    ];

    const autoFields = ["id", "createdAt", "updatedAt", 'issuers'];

        return (
            <div className='create-fgt-wrapper'>
                <ContainerHeader match={match} title='Clients'/>

                <PaginateComponent
                    rowsPerPage={5}
                    tableKey={columnsToDisplay[0].id}
                    uniqueRoleIdentifier='id'
                    fields={columnsToDisplay}
                    fieldsToCreate={fieldsToCreate}
                    fieldsToUpdate={fieldsToCreate}
                    autoFields={autoFields}
                    tableHeading='Clients'
                    baseEntityAPI='clients/v1'
                    templateCases={['custom-view']}
                    CustomViewComponent={CustomView}
                />

            </div>
        )
}

export default Clients;
