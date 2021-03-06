Template.downloadPage.onCreated(function() {
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)
  Session.set('dateRange', false)
  Session.set('validNumber', false)

    var self = this;
    self.autorun(function() {
      var id = FlowRouter.getParam('id');
      self.subscribe('DistrictLearningCenter', id);

      //subscribe batch id in Settings
      self.subscribe('batchId');

      // subsribe to only picture belong to this district center
      if (DLearningCenter.findOne()) {
        let picObjArr = DLearningCenter.findOne().uploadedPic
        let picIdArray = []
        lodash.forEach(picObjArr, function(photo) {
          picIdArray.push(photo.photoid)
        })
        self.subscribe('districtImageStore', picIdArray);
      }


      if (DLearningCenter.find().count() != 0) {

        Session.set('validNumber', true)

        // aggrate fees detail into batch number, sutdent count and total amount
        PromiseMeteorCall('districtCenterPersonFees', id)
        .then(res => {
          Session.set('feesDetail', res)

          // calculate fees detail with ratio
          let total = 0
          lodash.forEach(res, function(center) {
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
        Session.set('validNumber', false)
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
    return Session.get('validNumber')
  },
  feesObjects: function() {
    return Session.get('feesDetail')
  },
  numberDisplay: function(number) {
    let fixed = parseFloat(number).toFixed(2)
    return numberWithCommas(fixed)
  },
  lastestPhoto: function() {
    return Images.findOne({},{sort: {uploadedAt: -1} })
  }
});

Template.downloadPage.events({
  'change .custom-file-input': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err) {
          console.log(err)
        } else {
          console.log(fileObj)

          let batchId = Settings.findOne({valuename:"batchId"}).value

          PromiseMeteorCall('updatePhotoId', DLearningCenter.findOne()._id, batchId, fileObj._id)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
        }
      })
    })
  }
})
