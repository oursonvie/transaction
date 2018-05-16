Template.admin.onCreated(function() {
  Session.set('datePicker', false)

  var self = this;
  self.autorun(function() {
    if (Session.get('datePicker')) {
      self.subscribe('dateSubscribe', Session.get('datePicker').startDate, Session.get('datePicker').endDate);
    }
  });
});

Template.admin.helpers({
  Transactions: function(){
    return Transactions.find()
  },
  ifSearch: function() {
    return Session.get('datePicker')
  }
});

Template.admin.events({
  "click .btn-date-input": function(event, template){
     startDate = document.getElementById('startdate').value.trim()
     endDate = document.getElementById('enddate').value.trim()

     formatedStartDate = moment(startDate).toISOString()
     formatedEndDate = moment(endDate).toISOString()

     // set date date into session
     datePicker = {}

     datePicker.startDate = formatedStartDate
     datePicker.endDate = formatedEndDate

     if (datePicker.startDate && datePicker.endDate) {
       Session.set('datePicker', datePicker)
     } else {
       console.log('need both date')
     }

  },
  "click .btn-reset": function() {
    Session.set('datePicker', false)
  }
});
