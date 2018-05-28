Template.dcenterpdf.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)
  Session.set('dateRange', false)

    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('DistrictLearningCenter', id);

        // aggrate fees detail into batch number, sutdent count and total amount
        PromiseMeteorCall('districtCenterPersonFees', id)
        .then(res => {
          Session.set('feesDetail', res)

          // calculate fees detail with ratio a
          let total = 0
          _.forEach(res, function(center) {
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
        })
        .catch(err => {console.log(err)})

        // get start and end date for daterange
        PromiseMeteorCall('getDateRange', id)
        .then(res => {
          Session.set('dateRange', res)
        }).
        catch(err => {console.log(err)})

    });

});

Template.dcenterpdf.helpers({
  districtCenter: function() {
     return DLearningCenter.findOne()
  },
  feesInfo: function() {
    if (Session.get('feesInfo')) {
      return Session.get('feesInfo')
    }
  },
  xjtuDetail: function() {
    return Meteor.settings.public.xjtuaccountdetail
  },
  dateRage: function() {
    return Session.get('dateRange')
  }
});
