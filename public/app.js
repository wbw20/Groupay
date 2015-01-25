$(document).ready(function() {

  $('#create').click(function(event) {
    var name = $('#name').val();

    $.post('room', {
      name: name
    }).done(function(response) {
      window.location.href = 'rooms/' + response.id;
    });
  });
});
