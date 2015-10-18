import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import routes from 'routes';
import App from 'App';
// import cookies from 'browser-cookies';


export default class Root extends React.Component {

  render() {
    const devTools = (() => {
      if (OPTIMIZED) {
        return null;
      }
      return null;
    }());

    return (
      <div>
        <App />
        {devTools}
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
