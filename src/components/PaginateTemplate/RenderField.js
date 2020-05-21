import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { capitalize } from '../../util/utils';

const RenderField = ({
    type, label, id, multiline,
    options, value, changeHandler,
    action, validator, fieldError,
    extraData, selectAutoOptions
 }) => {
    switch (type) {
        case 'textfield': {
            return (
                <div className="col-md-6 col-12">
                    <TextField
                        label={label}
                        id={id}
                        margin="normal"
                        fullWidth
                        multiline={multiline}
                        value={value}
                        onChange={changeHandler}
                        onBlur={validator}
                    />
                <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            )
        }

        case 'number': {
            return (
                <div className="col-md-6 col-12">
                    <TextField
                        id={id}
                        label={label}
                        value={value}
                        onChange={changeHandler}
                        onBlur={validator}
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                        fullWidth
                    />
                    <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            ) 
        }

        case 'basicSelect': {
            return (
                <div className="col-md-6 col-12">
                    <TextField
                        id={id}
                        select
                        label={label}
                        value={value}
                        defaultValue={value}
                        onChange={changeHandler}
                        onBlur={validator}
                        SelectProps={{}}
                        helperText={`Please select one ${label}`}
                        margin="normal"
                        fullWidth
                    >
                    {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
                <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            )
        }

        case 'selectWithAutoFields': {
            return (
                <div className="col-md-6 col-12">
                    <TextField
                        id={id}
                        select
                        label={label}
                        value={value}
                        defaultValue={value}
                        onChange={changeHandler}
                        onBlur={validator}
                        SelectProps={{}}
                        helperText={`Please select one ${label}`}
                        margin="normal"
                        fullWidth
                    >
                    {extraData.map(option => (
                    <MenuItem key={option[selectAutoOptions.fieldValue]} value={option[selectAutoOptions.fieldValue]}>
                        {option[selectAutoOptions.fieldLabel]}
                    </MenuItem>
                    ))}
                </TextField>
                <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            )
        }
        
        case 'radio': {
            const newValue = action === 'update' ? capitalize(value.toString()) : value;
            return (
                <div className="col-md-6 col-12 mt-3">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{label}</FormLabel>
                        <RadioGroup
                        id={id}
                        className="d-flex flex-row"
                        defaultValue={newValue}
                        value={newValue}
                        onChange={changeHandler}
                        onBlur={validator}
                        >

                        {options.map(option => (
                         <FormControlLabel value={option.value}
                            control={<Radio color="primary"/>}
                            label={option.label}
                        />
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            )
        }
        
        case 'textarea':
        case 'jsonarea' : {
            return (
                <div className="col-md-6 col-12 fgt-textarea txtAreaPad">
                    <label>{label}</label>
                    <textarea
                    rows="4"
                    cols="50"
                    value={value}
                    id={id}
                    onChange={changeHandler}
                    onBlur={validator}
                    />
                    <p className="dynamic-error">{fieldError && fieldError.map((error) => <li>{error}</li>)}</p>
                </div>
            )
        }
        default:
            return null;
      }
}
 
export default RenderField;
