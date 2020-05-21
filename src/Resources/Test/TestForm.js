import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { capitalize } from "../../util/utils";

const TestForm = ({ changeHandler,
  fields,
  action,
  validator,
  data,
  fieldError,
  isCreatedDataLoading,
  handleFormSubmission,
  confirmFieldValidations }) => {

    const newHasMaturityDateValue =
      action === "update"
        ? capitalize(data.hasMaturityDate.toString())
        : data.hasMaturityDate;
    return (
      <>
        <div className="row test-form-parent">
          <div className="col-md-6 col-12">
            <TextField
              label="Name"
              id="name"
              margin="normal"
              fullWidth
              multiline={false}
              value={data.name && data.name}
              onChange={changeHandler("name")}
              onBlur={() =>
                validator(
                  "name",
                  "Name",
                  fields
                    .filter(field => field.id === "name")
                    .map(field => field.rules)[0],
                  data.name
                )
              }
            />
            <p className="dynamic-error">
              {fieldError.name &&
                fieldError.name.map(error => <li>{error}</li>)}
            </p>
          </div>
          <div className="col-md-6 col-12">
            <TextField
              label="Description"
              id="description"
              margin="normal"
              fullWidth
              multiline={true}
              value={data.description && data.description}
              onChange={changeHandler("description")}
              onBlur={() =>
                validator(
                  "description",
                  "Description",
                  fields
                    .filter(field => field.id === "description")
                    .map(field => field.rules)[0],
                  data.description
                )
              }
            />
            <p className="dynamic-error">
              {fieldError.description &&
                fieldError.description.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="minUser"
              label="Minimum User"
              value={data.minUser && data.minUser}
              onChange={changeHandler("minUser")}
              onBlur={() =>
                validator(
                  "minUser",
                  "Minimum User",
                  fields
                    .filter(field => field.id === "minUser")
                    .map(field => field.rules)[0],
                  data.maxUser
                )
              }
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              fullWidth
            />
            <p className="dynamic-error">
              {fieldError.minUser &&
                fieldError.minUser.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="maxUser"
              label="Maximum User"
              value={data.maxUser && data.maxUser}
              onChange={changeHandler("maxUser")}
              onBlur={() =>
                validator(
                  "maxUser",
                  "Maximum User",
                  fields
                    .filter(field => field.id === "maxUser")
                    .map(field => field.rules)[0],
                  data.maxUser
                )
              }
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              fullWidth
            />
            <p className="dynamic-error">
              {fieldError.maxUser &&
                fieldError.maxUser.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              label="Default Cycle Duration"
              id="defaultCycleDuration"
              margin="normal"
              fullWidth
              multiline={false}
              value={data.defaultCycleDuration && data.defaultCycleDuration}
              onChange={changeHandler("defaultCycleDuration")}
              onBlur={() =>
                validator(
                  "defaultCycleDuration",
                  "Default Cycle Duration",
                  fields
                    .filter(field => field.id === "defaultCycleDuration")
                    .map(field => field.rules)[0],
                  data.defaultCycleDuration
                )
              }
            />
            <p className="dynamic-error">
              {fieldError.defaultCycleDuration &&
                fieldError.defaultCycleDuration.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12 mt-3">
            <FormControl component="fieldset">
              <FormLabel component="legend">Has Maturity Date</FormLabel>
              <RadioGroup
                id="hasMaturityDate"
                className="d-flex flex-row"
                defaultValue={newHasMaturityDateValue}
                value={newHasMaturityDateValue}
                onChange={changeHandler("hasMaturityDate")}
                onBlur={() =>
                  validator(
                    "hasMaturityDate",
                    "Has Maturity Date",
                    fields
                      .filter(field => field.id === "hasMaturityDate")
                      .map(field => field.rules)[0],
                    data.hasMaturityDate
                  )
                }
              >
                {fields
                  .filter(field => field.id === "hasMaturityDate")
                  .map(field =>
                    field.options.map(option => (
                      <FormControlLabel
                        value={option.value}
                        control={<Radio color="primary" />}
                        label={option.label}
                      />
                    ))
                  )}
              </RadioGroup>
            </FormControl>
            <p className="dynamic-error">
              {fieldError.hasMaturityDate &&
                fieldError.hasMaturityDate.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="hasFixedIndividualAmount"
              select
              label="Has Fixed Individual Amount"
              value={data.hasFixedIndividualAmount}
              onChange={changeHandler("hasFixedIndividualAmount")}
              onBlur={() =>
                validator(
                  "hasFixedIndividualAmount",
                  "Has Fixed Individual Amount",
                  fields
                    .filter(field => field.id === "hasFixedIndividualAmount")
                    .map(field => field.rules)[0],
                  data.hasFixedIndividualAmount
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "hasFixedIndividualAmount")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.hasFixedIndividualAmount &&
                fieldError.hasFixedIndividualAmount.map(error => (
                  <li>{error}</li>
                ))}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="hasFixedGroupAmount"
              select
              label="Has Fixed Group Amount"
              value={data.hasFixedGroupAmount}
              onChange={changeHandler("hasFixedGroupAmount")}
              onBlur={() =>
                validator(
                  "hasFixedGroupAmount",
                  "Has Fixed Group Amount",
                  fields
                    .filter(field => field.id === "hasFixedGroupAmount")
                    .map(field => field.rules)[0],
                  data.hasFixedGroupAmount
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "hasFixedGroupAmount")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.hasFixedGroupAmount &&
                fieldError.hasFixedGroupAmount.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="isAutomatedCycle"
              select
              label="Is Automated Cycle"
              value={data.isAutomatedCycle}
              onChange={changeHandler("isAutomatedCycle")}
              onBlur={() =>
                validator(
                  "isAutomatedCycle",
                  "Is Automated Cycle",
                  fields
                    .filter(field => field.id === "isAutomatedCycle")
                    .map(field => field.rules)[0],
                  data.isAutomatedCycle
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "isAutomatedCycle")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.isAutomatedCycle &&
                fieldError.isAutomatedCycle.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="hasRollingBeneficiary"
              select
              label="Has Rolling Beneficiary"
              value={data.hasRollingBeneficiary}
              onChange={changeHandler("hasRollingBeneficiary")}
              onBlur={() =>
                validator(
                  "hasRollingBeneficiary",
                  "Has Rolling Beneficiary",
                  fields
                    .filter(field => field.id === "hasRollingBeneficiary")
                    .map(field => field.rules)[0],
                  data.hasRollingBeneficiary
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "hasRollingBeneficiary")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.hasRollingBeneficiary &&
                fieldError.hasRollingBeneficiary.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="hasFixedDefaultCycle"
              select
              label="Has Fixed Data Cycle"
              value={data.hasFixedDefaultCycle}
              onChange={changeHandler("hasFixedDefaultCycle")}
              onBlur={() =>
                validator(
                  "hasRollingBeneficiary",
                  "Has Fixed Data Cycle",
                  fields
                    .filter(field => field.id === "hasFixedDefaultCycle")
                    .map(field => field.rules)[0],
                  data.hasFixedDefaultCycle
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "hasFixedDefaultCycle")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.hasFixedDefaultCycle &&
                fieldError.hasFixedDefaultCycle.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              id="canJoinClosedGroup"
              select
              label="Can Join Closed Group"
              value={data.canJoinClosedGroup && data.canJoinClosedGroup}
              onChange={changeHandler("canJoinClosedGroup")}
              onBlur={() =>
                validator(
                  "canJoinClosedGroup",
                  "Can Join Closed Group",
                  fields
                    .filter(field => field.id === "canJoinClosedGroup")
                    .map(field => field.rules)[0],
                  data.canJoinClosedGroup
                )
              }
              SelectProps={{}}
              helperText={`Please select true or false`}
              margin="normal"
              fullWidth
            >
              {fields
                .filter(field => field.id === "canJoinClosedGroup")
                .map(field =>
                  field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
            </TextField>
            <p className="dynamic-error">
              {fieldError.canJoinClosedGroup &&
                fieldError.canJoinClosedGroup.map(error => <li>{error}</li>)}
            </p>
          </div>

          <div className="col-md-6 col-12">
            <TextField
              label="config"
              id="config"
              margin="normal"
              fullWidth
              multiline={true}
              value={data.config && data.config}
              onChange={changeHandler("config", "textarea")}
              onBlur={() =>
                validator(
                  "config",
                  "Config",
                  fields
                    .filter(field => field.id === "config")
                    .map(field => field.rules)[0],
                  data.config
                )
              }
            />
            <p className="dynamic-error">
              {fieldError.config &&
                fieldError.config.map(error => <li>{error}</li>)}
            </p>
          </div>
          <div className="col-md-12">
            <Button
              variant="contained"
              className="jr-btn jr-btn-lg bg-indigo lighten-1 text-white create-dialog mb-3"
              onMouseOver={confirmFieldValidations}
              onClick={handleFormSubmission}
            >
              <span>Create</span>
              {isCreatedDataLoading && (
                <CircularProgress size={18} color="white" />
              )}
            </Button>
          </div>
        </div>
      </>
    );
}

export default TestForm;
