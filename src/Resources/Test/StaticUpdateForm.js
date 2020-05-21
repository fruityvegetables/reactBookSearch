import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const StaticUpdateForm = ({ changeHandler, data, validator, confirmValidation, fieldErrors, onSubmit }) => {

    return (
      <div className='create-fgt-wrapper'>

        <div className="row">
          
            <form className="row fgt-form" noValidate autoComplete="off">
              <div className="col-md-6 col-12">
                <TextField
                  name="name"
                  label="Name"
                  value={data.name && data.name}
                  onChange={changeHandler('name')}
                  onBlur={() => validator('name', 'Name', {
                    required: true,
                    string: true,
                }, data.name)}
                  margin="normal"
                  fullWidth
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.name && fieldErrors.name.map((error) => <li key={error}>{error}</li>)}</p>
              </div>
          
              <div className="col-md-6 col-12">
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  value={data.description && data.description}
                  onChange={changeHandler('description')}
                  onBlur={() => validator('description', 'Description', {
                    required: true,
                    string: true,
                }, data.description)}
                  margin="normal"
                  fullWidth
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.description && fieldErrors.description.map((error) => <li key={error}>{error}</li>)}</p>
              </div>

              <div className="col-md-6 col-12">
                <TextField
                  name="minUser"
                  label="Minimum Users"
                  value={data.minUser && data.minUser}
                  onChange={changeHandler('minUser')}
                  onBlur={() => validator('minUser', 'Minimum User', {
                    required: true,
                    numeric: true,
                }, data.minUser)}
                  margin="normal"
                  fullWidth
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.minUser && fieldErrors.minUser.map((error) => <li key={error}>{error}</li>)}</p>
              </div>

              <div className="col-md-6 col-12">
                <TextField
                  name="defaultCycleDuration"
                  label="Default Cycle Duration"
                  placeholder='1w, 1m, 1y'
                  value={data.defaultCycleDuration && data.defaultCycleDuration}
                  onChange={changeHandler('defaultCycleDuration')}
                  onBlur={() => validator('defaultCycleDuration', 'Default Cycle Duration', {
                    required: true,
                    string: true,
                    match: { 
                        match: /\d+(d|w|m)/,
                        message: 'Must match this format: [1d, 2d, 1w, 2w, 1m, 2m]'}
                }, data.defaultCycleDuration)}
                  margin="normal"
                  fullWidth
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.defaultCycleDuration && fieldErrors.defaultCycleDuration.map((error) => <li key={error}>{error}</li>)}</p>
              </div>

              <div className="col-md-6 col-12">
                <TextField
                  name="maxUser"
                  label="Maximum Users"
                  value={data.maxUser && data.maxUser}
                  onChange={changeHandler('maxUser')}
                  onBlur={() => validator('maxUser', 'Maximum User', {
                    required: true,
                    numeric: true,
                }, data.maxUser)}
                  margin="normal"
                  fullWidth
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.maxUser && fieldErrors.maxUser.map((error) => <li key={error}>{error}</li>)}</p>
              </div>

              <div className="col-md-6 col-12 fgt-textarea txtAreaPad">
                <label>Include Field Requirements As JSON</label>
                <textarea
                  rows="4"
                  cols="50"
                  value={data.config && data.config}
                  name='config'
                  onChange={changeHandler('config')}
                  onBlur={() => validator('config', 'Include Configuration as JSON', {
                    required: true,
                    json: true,
                }, data.config)}
                />
                <p className="marineAlertdanger fgt-error">{fieldErrors.config && fieldErrors.config.map((error) => <li key={error}>{error}</li>)}</p>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldRuleset" >
                  <FormLabel component="legend">Has Maturity Date</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label=""
                    name="hasMaturityDate"
                    value={data.hasMaturityDate && data.hasMaturityDate}
                    onChange={changeHandler('hasMaturityDate')}
                    onBlur={() => validator('hasMaturityDate', 'Has Maturity Date', {
                      required: true,
                  }, data.hasMaturityDate)}
                  >
                    <FormControlLabel value='True' control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value='False' control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.hasMaturityDate && fieldErrors.hasMaturityDate.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Has Fixed Individual Amount</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Has Fixed Individual Amount"
                    name="hasFixedIndividualAmount"
                    value={data.hasFixedIndividualAmount && data.hasFixedIndividualAmount}
                    onChange={changeHandler('hasFixedIndividualAmount')}
                    onBlur={() => validator('hasFixedIndividualAmount', 'Has Fixed Individual Amount', {
                      required: true,
                  }, data.hasFixedIndividualAmount)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.hasFixedIndividualAmount && fieldErrors.hasFixedIndividualAmount.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Has Fixed Group Amount</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Has Fixed Group Amount"
                    name="hasFixedGroupAmount"
                    value={data.hasFixedGroupAmount && data.hasFixedGroupAmount}
                    onChange={changeHandler('hasFixedGroupAmount')}
                    onBlur={() => validator('hasFixedGroupAmount', 'Has Fixed Group Amount', {
                      required: true,
                  }, data.hasFixedGroupAmount)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.hasFixedGroupAmount && fieldErrors.hasFixedGroupAmount.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Is An Automated Cycle</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Is An Automated Cycle"
                    name="isAutomatedCycle"
                    value={data.isAutomatedCycle && data.isAutomatedCycle}
                    onChange={changeHandler('isAutomatedCycle')}
                    onBlur={() => validator('isAutomatedCycle', 'Has Automated Cycle', {
                      required: true,
                  }, data.isAutomatedCycle)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.isAutomatedCycle && fieldErrors.isAutomatedCycle.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Has Rolling Beneficiary</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Has Rolling Beneficiary"
                    name="hasRollingBeneficiary"
                    value={data.hasRollingBeneficiary && data.hasRollingBeneficiary}
                    onChange={changeHandler('hasRollingBeneficiary')}
                    onBlur={() => validator('hasRollingBeneficiary', 'Has Rolling Beneficiary', {
                      required: true,
                  }, data.hasRollingBeneficiary)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.hasRollingBeneficiary && fieldErrors.hasRollingBeneficiary.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Has Fixed Default Cycle</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Has Fixed Default Cycle"
                    name="hasFixedDefaultCycle"
                    value={data.hasFixedDefaultCycle && data.hasFixedDefaultCycle}
                    onChange={changeHandler('hasFixedDefaultCycle')}
                    onBlur={() => validator('hasFixedDefaultCycle', 'Has Fixed Default Cycle', {
                      required: true,
                  }, data.hasFixedDefaultCycle)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.hasFixedDefaultCycle && fieldErrors.hasFixedDefaultCycle.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="col-sm-6 fgt-radio">
                <FormControl component="fieldset" >
                  <FormLabel component="legend">Can Join Closed Group</FormLabel>
                  <RadioGroup
                    className="d-flex flex-row"
                    aria-label="Can Join Closed Group"
                    name="canJoinClosedGroup"
                    value={data.canJoinClosedGroup && data.canJoinClosedGroup}
                    onChange={changeHandler('canJoinClosedGroup')}
                    onBlur={() => validator('canJoinClosedGroup', 'Can Join Closed Group', {
                      required: true,
                  }, data.canJoinClosedGroup)}
                  >
                    <FormControlLabel value="True" control={<Radio color="primary"/>} label="True"/>
                    <FormControlLabel value="False" control={<Radio color="primary"/>} label="False"/>
                    <p className="marineAlertdanger">{fieldErrors.canJoinClosedGroup && fieldErrors.canJoinClosedGroup.map((error) => <li key={error}>{error}</li>)}</p>
                  </RadioGroup>
                </FormControl>
              </div>

            <Button
              variant="contained"
              className="jr-btn jr-btn-lg bg-indigo lighten-1 text-white fgt-button"
              onClick={onSubmit}
              onMouseOver={confirmValidation}
            >
              <span>Create Funding Group Type</span>
            </Button> 
            {false && <div className="loader-view fgt-loader">
              <CircularProgress size={20}/>
            </div>}
        </form>
        </div>
      </div>
    );
}

export default StaticUpdateForm;
