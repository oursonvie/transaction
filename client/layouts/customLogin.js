Template.customLogin.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.customLogin.events({
  "submit form": function(event, template){
    event.preventDefault()
    const username = document.getElementById('emailInput').value.trim()
    const password = document.getElementById('passwordInput').value.trim()

    Meteor.loginWithPassword(username, password)
  }
});
