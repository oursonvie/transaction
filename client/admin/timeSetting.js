let getTotalResult = () => {
  return Session.get('totalFeeResult')
}

Template.timeSetting.onCreated(function() {
  Session.set('datePicker', false)
  Session.set('totalFeeResult', false)

  var self = this;
  self.autorun(function() {
    if (Session.get('datePicker')) {

      PromiseMeteorCall('totalFee', Session.get('datePicker').startDate, Session.get('datePicker').endDate)
      .then(res => {
        //console.log(res)
        Session.set('totalFeeResult', res)
      })
      .catch(err => console.log(err))

      // self.subscribe('dateSubscribe', Session.get('datePicker').startDate, Session.get('datePicker').endDate);
    }
  });
});

Template.timeSetting.helpers({
  ifSearch: function() {
    return Session.get('datePicker')
  },
  totalPeopleTime: function() {
    if (getTotalResult()) {
      let total = getTotalResult()
      return sum(total.map(x => Number(x.count)));
    }
  },
  totalPaid: function() {
    if (getTotalResult()) {
      let total = getTotalResult()
      return sum(total.map(x => Number(x.totalFee)));
    }
  },
  commaNumber: function(number) {
    if (number) {
      return numberFormatter(number)
    }
  },
  fullResult: function() {
    return getTotalResult()
  }
});

Template.timeSetting.events({
  "click .btn-date-input": function(event, template){

     // startDate = document.getElementById('startdate').value.trim()
     // endDate = document.getElementById('enddate').value.trim()

     // fast testing
     startDate = '2017-11-1'
     endDate = '2018-4-30'

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
  },
  "click .btn-yes": function() {
    PromiseMeteorCall('copyToWorking', Session.get('datePicker').startDate, Session.get('datePicker').endDate)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
});
