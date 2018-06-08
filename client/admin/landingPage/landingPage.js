Template.landingPage.onCreated(function() {

  //

  // print methods
  let appId = FlowRouter.getParam("appId");
  console.log(appId);

  // parameter used
  let color = FlowRouter.getQueryParam("color");
  console.log(color);




});

Template.landingPage.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.landingPage.events({
  "click #foo": function(event, template){

  }
});
