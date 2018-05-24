Template.DLCenterDetail.onCreated(function() {
  Session.set('feesDetail', false)
  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    if (Session.get('action') && Session.get('action').type == 'view')
    PromiseMeteorCall('districtCenterPersonFees', Session.get('action').id)
    .then(res => {
      Session.set('feesDetail', res)
    })
    .catch(err => {console.log(err)})
  })

});

Template.DLCenterDetail.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  lcenterCount: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id}).sublearningcenter.length
  },
  totalFees: function() {
    if (Session.get('feesDetail')) {
      let result = lodash.sumBy(Session.get('feesDetail'), 'totalFee')
      return result
    }
  },
  feesObjects: function() {
    if (Session.get('feesDetail')) {
      return Session.get('feesDetail')
    }
  },
  numberDisplay: function(number) {
    let fixed = parseFloat(number).toFixed(2)
    return numberWithCommas(fixed)
  }
});

Template.DLCenterDetail.events({
  'click .btn-edit': function() {
    Session.set('action', { type:'edit',  id: this._id} )
  }
})
