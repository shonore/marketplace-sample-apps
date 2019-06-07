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
