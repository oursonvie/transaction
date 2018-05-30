Template.downloadPage.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)
  Session.set('dateRange', false)

  Session.set('valideNumber', false)

    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');

        console.log(id)

        self.subscribe('DistrictLearningCenter', id);

        if (DLearningCenter.find().count() != 0) {

          Session.set('valideNumber', true)

          // aggrate fees detail into batch number, sutdent count and total amount
          PromiseMeteorCall('districtCenterPersonFees', id)
          .then(res => {
            Session.set('feesDetail', res)

            // calculate fees detail with ratio
            let total = 0
            _.forEach(res, function(center) {
              total += lodash.sumBy(center.paymentdetail, 'totalFee')
            })

            let feesInfo = {}
            // get extra money amount first
            feesInfo.extraAmount = DLearningCenter.findOne().extraAmount

            feesInfo.total = total + feesInfo.extraAmount
            feesInfo.extraAmount = DLearningCenter.findOne().extraAmount
            feesInfo.lowratio = DLearningCenter.findOne().returnratio
            feesInfo.currentratio = getRatio(feesInfo.total, feesInfo.lowratio)
            feesInfo.xjturatio = 1 - feesInfo.currentratio
            feesInfo.lcenterAmount = feesInfo.total * feesInfo.currentratio
            feesInfo.xjtuamount = feesInfo.total - feesInfo.lcenterAmount

            Session.set('feesInfo', feesInfo)
          })
          .catch(err => {console.log(err)})

          // get start and end date for daterange
          PromiseMeteorCall('getDateRange', id)
          .then(res => {
            Session.set('dateRange', res)
          }).
          catch(err => {console.log(err)})

        } else {
          Session.set('valideNumber', false)
          console.log('no matching student')
        }

    });

});

Template.downloadPage.helpers({
  districtCenter: function() {
     return DLearningCenter.findOne()
  },
  xjtuDetail: function() {
    return Meteor.settings.public.xjtuaccountdetail
  },
  dateRage: function() {
    return Session.get('dateRange')
  },
  validNumber: function() {
    return Session.get('valideNumber')
  }
});
