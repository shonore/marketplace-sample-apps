/**
 * @description -
 *
 * This app uses a Custom Installation page to get input from the user through
 * a color picker from element. It also dynamically populates a drop down field
 * by making an API call.
 *
 * These values are then used in the ticket details page to render the drop down
 * field value in the selected background color.
 *
 *  */
$(document).ready(function () {
  init();
});

function init() {
  app.initialized().then(function (clientObj) {
    renderBookCover(clientObj);
  });
}

function renderBookCover(clientObj) {
  let client = clientObj;
  client.events.on('app.activated', function () {
    startRender();
  });

  function startRender() {
    client.iparams.get('bgColour').then((data) => {
      $('body').css('background-color', data.bgColour);
    });
    client.iparams.get('book').then((data) => {
      $('#apptext').html(`Your book is <br> ${data.book}`);
    });
  }
}
