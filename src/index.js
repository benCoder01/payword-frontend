import React from 'react';
import ReactDOM from 'react-dom';
import AppViewer from './containers/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {BrowserRouter as Router} from "react-router-dom"
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk))

const theme = createMuiTheme({
  /*
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#CE2B2C',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#42a5f5"
    }
  },
  */ 
  typography: {
    useNextVariants: true,
  },
});




ReactDOM.render(
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppViewer />
        </MuiThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
