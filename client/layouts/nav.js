Template.nav.onCreated(function() {
  Session.set('searchQuery', false)
});

Template.nav.events({
  "submit form": function(event, template){
    event.preventDefault();

    let inputValue = document.getElementById('searchQuery').value.trim()

    Session.set('searchQuery', inputValue)

  },
  "click .btn-reset": function() {
    document.getElementById('searchQuery').value = ''
    Session.set('searchQuery', false)
  }
});
