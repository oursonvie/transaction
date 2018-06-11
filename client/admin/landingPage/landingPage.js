//check if timestamp within 10mins, 5mins before and 5 mins after
let validationTimeStamp = (time) => {
  let duration = 10 * 60// 10 mins
  let current_time = moment().unix()
  let start_time = current_time - duration/2
  let end_time = current_time + duration/2
  if (time >= start_time && time <= end_time) {
    return true
  } else {
    return false
  }
}

Template.landingPage.onCreated(function() {

  // print methods
  let appId = FlowRouter.getParam("appId");
  console.log(appId);

  try {
    // get learning center code
    let lcentercode = decryptStamp(FlowRouter.getQueryParam("lcentercode"));
    console.log(lcentercode);

    // get timestamp
    let timestamp = decryptStamp(FlowRouter.getQueryParam("timestamp"));
    console.log(timestamp)

    if (validationTimeStamp(timestamp)) {
      console.log('valid Time')

      // if time is valid, try to subscribe dlcenter using lcenter
      var self = this;
      self.autorun(function() {
        self.subscribe('DLCCode', lcentercode)
      })

    } else {
      console.log('bad time')
    }

  } catch(err) {
    // try catch err and redirect to err page
    console.log(err)
  }


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
