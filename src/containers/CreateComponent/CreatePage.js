import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert} from "@material-ui/lab";
import {
  createResource,
  createResourceStart,
  closeAlert
} from "../../actions/Entities";
import { FieldValidator } from "../../util/fieldValidator";

const initialState = {};
export class CreatePage extends Component {
  constructor(props) {
    super(props);
    const data = {};
    const { fields } = this.props;
    fields.forEach(obj => (data[obj.id] = ""));
    this.state = {
      data,
      errors: {}
    };
  }

  componentDidMount() {
    const { isCreatePageOpen } = this.props;
    if (isCreatePageOpen === false) {
      this.props.history.push("/app/table");
    }
  }

  componentDidUpdate() {
    const { isCreatePageOpen } = this.props;
    if (isCreatePageOpen === false) {
      this.props.history.push("/app/table");
    }
  }

  closePage = () => {
    this.props.history.push("/app/table");
  };

  handleChange = name => e => {
    const { value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  confirmFieldValidations = async () => {
    const { data, errors } = this.state;
    const { fields } = this.props;

    const unFilledFields = Object.keys(data).filter(
      field => !Object.keys(errors).includes(field)
    );
    unFilledFields.forEach(missingField => {
      let { rules, label } = fields.find(
        fieldObject => fieldObject.id === missingField
      );
      const fieldError = FieldValidator(label, rules, data[missingField]);
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [missingField]: fieldError
        }
      }));
    });
  };

  handleFormSubmission = () => {
    const {
      createResource: create,
      createResourceStart: createStart,
      baseEntityAPI
    } = this.props;
    const { data, errors } = this.state;

    if (Object.values(errors).every(array => array.length === 0)) {
      createStart();
      create(data, baseEntityAPI);
      this.setState(initialState);
    }
  };

  closeFailureAlert = () => {
    const { closeAlert: close } = this.props;
    close();
  };

  handleFieldValidation = (name, label, rules, value) => {

    const fieldError = FieldValidator(label, rules, value);
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: fieldError
      }
    }));
  };
  render() {
    const {
      fields,
      NewPageFormComponent,
      isCreatedDataLoading,
      isFailed,
      actionPurpose,
      errorObject,
      isFailedWithGeneralError,
      isConfigError,
      configErrorMessage
    } = this.props;

    return (
      <div className="{classes.root}">
        <Paper className="{classes.paper}">
          {isFailed && (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="secondary"
                  size="small"
                  onClick={this.closeFailureAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {Object.keys(errorObject).map((error, index) => (
                <li>
                  {error} - {Object.values(errorObject)[index]}
                </li>
              ))}
            </Alert>
          )}
          {isFailedWithGeneralError && (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="secondary"
                  size="small"
                  onClick={this.closeFailureAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Something wrong happened. Please re-try.
            </Alert>
          )}
          {isConfigError && (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="secondary"
                  size="small"
                  onClick={this.closeFailureAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {configErrorMessage.map(obj => {
                if (Object.keys(obj).length !== 0) {
                  return Object.keys(obj).map((error, index) => (
                    <li>
                      {error} - {Object.values(obj)[index]}
                    </li>
                  ));
                }
              })}
            </Alert>
          )}
          <div className="close-button">
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={this.closePage}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <form className="row">
            <NewPageFormComponent
              fields={fields}
              data={this.state.data}
              fieldError={this.state.errors}
              changeHandler={this.handleChange}
              validator={this.handleFieldValidation}
              handleFormSubmission={this.handleFormSubmission}
              isCreatedDataLoading={isCreatedDataLoading}
              confirmFieldValidations={this.confirmFieldValidations}
              action={actionPurpose}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createResource,
  createResourceStart,
  closeAlert
};

const mapStateToProps = ({ Entities }) => {
  return {
    fields: Entities.otherData.fields,
    isCreatePageOpen: Entities.isCreatePageOpen,
    actionPurpose: Entities.otherData.actionPurpose,
    baseEntityAPI: Entities.otherData.baseEntityAPI,
    NewPageFormComponent: Entities.otherData.newPageFormComponent,
    isCreatedDataLoading: Entities.isCreatedDataLoading,
    isFailed: Entities.isFailed,
    errorObject: Entities.errorObject,
    isFailedWithGeneralError: Entities.isFailedWithGeneralError,
    configErrorMessage: Entities.configErrorMessage,
    isConfigError: Entities.isConfigError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePage));
