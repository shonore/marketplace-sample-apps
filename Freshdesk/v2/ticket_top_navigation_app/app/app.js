/** This app adds a shortcut to start the timer in the top navigation of the
 * tickt details page. On clicking the app icon, the Start Timer form will be
 * shown.
 */

// $(document).ready( () => {
//   // Initialize channel
//   app.initialized().then((_client) => {
//     let client = _client;
//     // App activate callback
//     client.events.on('app.activated', () => {
//       // Open modal to collect params to start timer Interface API
//       client.interface.trigger('showModal', {
//         title: 'Start timer',
//         template: 'startTimer.html' })
//       .then(null, (error) => {
//         client.interface.trigger('showNotify', {
//           type: 'error',
//           message: 'Some error has occured in \'Start timer app\'.'});
//       });
//     });

//     client.instance.receive((event) => {
//       let data = event.helper.getData();
//       if (data.message.agent) {
//         // start the timer
//         client.interface.trigger('start', {
//           id: 'timer',
//           value: data.message
//         });
//       }
//     });
//   }, (error) => {
//     client.interface.trigger('showNotify', {
//       type: 'error',
//       message: 'Some error has occured in \'Start timer app\'.'});
//   });
// });

/** This app adds a shortcut to start the timer in the top navigation of the
 * tickt details page. On clicking the app icon, the Start Timer form will be
 * shown.
 */

$(document).ready(() => {
  app.initialized().then((_client) => {
    let client = _client;
    client.events.on('app.activated', () => {
      shootModal(client);
    });
    client.instance.receive((event) => {
      triggerStart(event, client)
    }, (error) => {
      notifyError(error);
    });
  });

  function shootModal(client) {
    client.interface.trigger('showModal', {
      title: 'Start timer',
      template: 'startTimer.html'
    }).then(null, (error, client) => {
      notifyError(error);
    });
  }

  function notifyError(error, client) {
    client.interface.trigger('showNOtify', {
      type: 'error',
      message: `Some error has occured in 'Start timer app'.`
    });
  }

  function triggerStart(event, client) {
    let data = event.helper.getData();
    if (data.message.agent) {
      client.interface.trigger('start', {
        id: 'timer',
        value: data.message
      });
    }
  }
});
