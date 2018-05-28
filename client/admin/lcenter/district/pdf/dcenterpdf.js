Template.dcenterpdf.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)

    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('DistrictLearningCenter', id);

        PromiseMeteorCall('districtCenterPersonFees', id)
        .then(res => {
          Session.set('feesDetail', res)
        })
        .catch(err => {console.log(err)})
    });

});

Template.dcenterpdf.helpers({
  districtCenter: function() {
     return DLearningCenter.findOne()
  },
  feesDetail: function() {
    if (Session.get('feesDetail')) {
      return Session.get('feesDetail')
    }
  },
  totalFees: function() {
    if (Session.get('feesDetail')) {
      // sum array
      let arrayFees = Session.get('feesDetail')
      let total = 0

      _.forEach(arrayFees, function(center) {
        total += lodash.sumBy(center.paymentdetail, 'totalFee')
      })

      let feesInfo = {}
      feesInfo.total = total
      feesInfo.lowratio = DLearningCenter.findOne().returnratio
      feesInfo.currentratio = getRatio(feesInfo.total, feesInfo.lowratio)
      feesInfo.xjturatio = 1 - feesInfo.currentratio
      feesInfo.lcenterAmount = feesInfo.total * feesInfo.currentratio
      feesInfo.xjtuamount = total - feesInfo.lcenterAmount

      Session.set('feesInfo', feesInfo)

      return total
    }
  },
  feesInfo: function() {
    if (Session.get('feesInfo')) {
      return Session.get('feesInfo')
    }
  },
  xjtuDetail: function() {
    return Meteor.settings.public.xjtuaccountdetail
  }
});
