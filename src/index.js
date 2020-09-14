import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import notificationRequest from './notificationRequest';

ReactDOM.render(<App />, document.getElementById(`root`));

(async function() {
  serviceWorker.register({
    async onRegister() {
      await notificationRequest();
    }
  });
})();
