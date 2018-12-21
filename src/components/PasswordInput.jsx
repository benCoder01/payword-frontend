import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

class PasswordInput extends React.Component {
    state ={
        password: '',
        showPassword: false,
    }
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };


    render() {
        return(
            <div>
            <InputLabel htmlFor="passwordField">
            {this.props.label}
            </InputLabel>
            <Input
            id="passwordField"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.props.password}
            onChange={this.props.handleChange(this.props.name)}
            fullWidth
            error={this.props.error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            />
        </div>
        );
    }
}

export default PasswordInput