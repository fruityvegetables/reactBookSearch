import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { capitalize } from '../../util/utils';
import RenderField from '../../components/PaginateTemplate/RenderField';
import { createResourceStart, closeAlert, updateResource, updateResourceStart } from '../../actions/Entities';
import { FieldValidator } from '../../util/fieldValidator';

class UpdateDialog extends Component {
    constructor(props) {
        super(props);
        const { dataToUpdate } = this.props;

        this.state = {
          data: {
            ...dataToUpdate
          },
          errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.dataToUpdate.id !== prevState.data.id){
          return { data: { ...nextProps.dataToUpdate }};
       }
       else return null;
     }

    
  handleChange = (name) => e => {
    const { value } = e.target;
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [name]: value
      }
    }))
  }

  confirmFieldValidations = async () => {
    const { data, errors } = this.state;
    const { fields, autoFields } = this.props;
    const unFilledFields = (Object.keys(data)
        .filter(field => !autoFields.includes(field)))
        .filter(field => !Object.keys(errors)
        .includes(field));
    
    unFilledFields.forEach(missingField => {
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
    const { updateResource: update, updateResourceStart: updateStart, baseEntityAPI, templateCases } = this.props;
    const { data, errors } = this.state;
    
      if(Object.values(errors).every(array => array.length === 0)) {
        updateStart();
        update(data, data.id, baseEntityAPI);
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
    const {
      open, closeCreateModal, fields,
      tableHeading, isUpdateDataLoading,
      isUpdateFailed, actionPurpose, autoFields,
      templateCases, FormComponent, fieldRules,
      updateErrorObject, extraEntitiesToFetch, extraData,
      isUpdateFailedWithGenError
    } = this.props;

    let newDataObject = {};
    let extraDataArray = [];

    if(extraEntitiesToFetch) { 
    const extraDataField = extraEntitiesToFetch[0]
    extraDataArray = extraData[extraDataField]
    }

    if(templateCases.includes('static-update-form')) {
      const newDataArray = Object.entries(this.state.data).map(array => {
        if (typeof array[1] === 'boolean') {
          return [array[0], capitalize(array[1].toString())];
        }
        return array;
      })
      if (newDataArray.length !== 0) {
      newDataObject = newDataArray.reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1];
        return accumulator;
      }, {})
    }
      
      return (
        <Dialog
        open={open}
        onClose={closeCreateModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{capitalize(tableHeading)}</DialogTitle>

        {isUpdateFailed && <Alert
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
            {updateErrorObject && Object.keys(updateErrorObject).map((error, index) =>
              <li>{error} - {Object.values(updateErrorObject)[index]}</li>
            )}
          </Alert>}

          {isUpdateFailedWithGenError && <Alert
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

        <FormComponent
          validator={this.handleFieldValidation}
          confirmValidation={this.confirmFieldValidations}
          changeHandler={this.handleChange}
          data={newDataObject}
          onSubmit={this.handleFormSubmission}
          rules={fieldRules}
          fieldErrors={this.state.errors}
          autoFields={autoFields}
        />
      </Dialog>
      )
    } else {
      return (
        <Dialog
          open={open}
          onClose={closeCreateModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{capitalize(tableHeading)}</DialogTitle>
  
          {isUpdateFailed && <Alert
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
              {updateErrorObject && Object.keys(updateErrorObject).map((error, index) =>
                <li>{error} - {Object.values(updateErrorObject)[index]}</li>
              )}
            </Alert>}
  
            {isUpdateFailedWithGenError && <Alert
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
                        fieldError={this.state.errors[field.id]}
                        value={this.state.data[field.id]}
                        changeHandler={this.handleChange(field.id)}
                        validator={() => this.handleFieldValidation(field.id, field.label, field.rules, this.state.data[field.id])}
                        action={actionPurpose}
                        extraData={extraDataArray}
                        selectAutoOptions={field.autoOptions && field.autoOptions}
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
              <span>Update</span>
              {isUpdateDataLoading && <CircularProgress size={18} color="white" />}
            </Button>
          </DialogActions>
      </Dialog>
    )
    }
  }
}

const mapDispatchToProps = {
  createResourceStart,
  closeAlert,
  updateResource,
  updateResourceStart
};

const mapStateToProps = ({ Entities }) => {
  return {
    isUpdateDataLoading: Entities.isUpdateDataLoading,
    isUpdateFailed: Entities.isUpdateFailed,
    updateErrorObject: Entities.updateErrorObject,
    updateConfigError: Entities.updateConfigError,
    isUpdateFailedWithGenError: Entities.isUpdateFailedWithGenError,
    configError: Entities.configError
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDialog);
