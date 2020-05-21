import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { capitalize } from '../../util/utils';
import RenderField from '../../components/PaginateTemplate/RenderField';
import { createResource, createResourceStart, closeAlert } from '../../actions/Entities';
import { FieldValidator } from '../../util/fieldValidator';
 
class CreateDialog extends Component {
  constructor(props) {
    super(props);
    const data = {};
    const { fields } = this.props;
    fields.forEach(obj => data[obj.id] = '')
    this.state = {
      data,
      errors: {},
      currentValue: '',
      currentField: ''
    }
  }

  handleChange = (name) => e => {
    const { value } = e.target;
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [name]: value
      },
    }))
  }

  confirmFieldValidations = async () => {
    const { data, errors } = this.state;
    const { fields } = this.props;

    const unFilledFields = Object.keys(data).filter(field => !Object.keys(errors).includes(field)); // Get fields that haven't been filled
    unFilledFields.forEach(missingField => { // Get the rules and labels for these unfilled fields and run the validator on each
      let { rules, label } = fields.find(fieldObject => fieldObject.id === missingField);
        const fieldError = FieldValidator(label, rules, data[missingField]);
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [missingField]: fieldError
        }
      }))
    })
  }

  handleFormSubmission = () => {
    const { createResource: create, createResourceStart: createStart, baseEntityAPI } = this.props;
    const { data, errors } = this.state;

    if(Object.values(errors).every(array => array.length === 0)) {
        createStart();
        create(data, baseEntityAPI);
      }
  }

  closeFailureAlert = () => {
    const { closeAlert: close } = this.props;
    close();
  }

  handleFieldValidation = (name, label, rules, value) => {
    const fieldError = FieldValidator(label, rules, value);
    this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: fieldError
      }
    }))
  }

  render() {
    const { open, closeCreateModal,
      fields, tableHeading, isCreatedDataLoading,
      isFailed, actionPurpose, errorObject,
      isFailedWithGeneralError, isConfigError,
      configError, FormComponent, templateCases,
      fieldRules, extraEntitiesToFetch, extraData
     } = this.props;

     let extraDataArray = [];

     if(extraEntitiesToFetch) { 
      const extraDataField = extraEntitiesToFetch[0]
      extraDataArray = extraData[extraDataField]
     }

     if (templateCases.includes('static-create-form')) {

      return (
        <Dialog
          open={open}
          onClose={closeCreateModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{capitalize(tableHeading)}</DialogTitle>
          {isCreatedDataLoading && <span className="static-spinner"><CircularProgress size={18} color="primary" /></span>}
          {isFailed && 
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
                }>
              {errorObject && typeof errorObject === 'string' ?
              <li>error - {errorObject}</li> :
              Object.keys(errorObject).map((error, index) =>
                <li>{error} - {Object.values(errorObject)[index]}</li>
              )}
            </Alert>}

            {isFailedWithGeneralError && <Alert
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
            </Alert>}

            {isConfigError && 
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
                }>
              {configError && configError.map(obj => {
                if (Object.keys(obj).length !== 0) {
                  return Object.keys(obj).map((error, index) =>
                <li>{error} - {Object.values(obj)[index]}</li>
              )}
              })}
            </Alert>}
            
          <FormComponent
            onSubmit={this.handleFormSubmission}
            changeHandler={this.handleChange}
            validator={this.handleFieldValidation}
            confirmValidation={this.confirmFieldValidations}
            data={this.state.data}
            fieldErrors={this.state.errors}
            rules={fieldRules}
          />

        </Dialog>
    )} else {
        return (
          <Dialog
          open={open}
          onClose={closeCreateModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isFailed && 
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
                }>
              {errorObject && Object.keys(errorObject).map((error, index) =>
                <li key={index}>{error} - {Object.values(errorObject)[index]}</li>
              )}
            </Alert>}

            {isFailedWithGeneralError && <Alert
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
            </Alert>}

            {isConfigError && 
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
                }>
              {configError && configError.map(obj => {
                if (Object.keys(obj).length !== 0) {
                  return Object.keys(obj).map((error, index) =>
                <li>{error} - {Object.values(obj)[index]}</li>
              )}
              })}
            </Alert>}

          <DialogTitle id="alert-dialog-title">{capitalize(tableHeading)}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <form className="row">
                {fields.map(field => {
                return (
                    <RenderField
                        key={field.id}
                        type={field.type}
                        label={field.label}
                        id={field.id}
                        name={field.id}
                        multiline={field.multiline && field.multiline}
                        options={field.options && field.options}
                        selectAutoOptions={field.autoOptions && field.autoOptions}
                        value={this.state.data[field.id]}
                        fieldError={this.state.errors[field.id]}
                        changeHandler={this.handleChange(field.id)}
                        validator={() => this.handleFieldValidation(field.id, field.label, field.rules, this.state.data[field.id])}
                        action={actionPurpose}
                        extraData={extraDataArray}
                    />
                    )
                })} 
          </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button
              variant="contained"
              className="jr-btn jr-btn-lg bg-indigo lighten-1 text-white create-dialog mb-3"
              onMouseOver={this.confirmFieldValidations}
              onClick={this.handleFormSubmission}
            >
              <span>Create</span>
              {isCreatedDataLoading && <CircularProgress size={18} color="white" />}
            </Button>
          </DialogActions>
      </Dialog>
      )
    }
  }
}

const mapDispatchToProps = {
  createResource,
  createResourceStart,
  closeAlert
};

const mapStateToProps = ({ Entities }) => {
  return {
    isCreatedDataLoading: Entities.isCreatedDataLoading,
    isFailed: Entities.isFailed,
    errorObject: Entities.errorObject,
    isFailedWithGeneralError: Entities.isFailedWithGeneralError,
    configError: Entities.configError,
    isConfigError: Entities.isConfigError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDialog);
