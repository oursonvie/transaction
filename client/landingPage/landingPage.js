//check if timestamp within 10mins, 5mins before and 5 mins after
let validationTimeStamp = (time) => {
  let duration = 60 * 60// 10 mins
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
  Session.set('feesDetail', false)
  Session.set('feesInfo', false)
  Session.set('dateRange', false)
  Session.set('validNumber', false)

  // print methods
  let appId = FlowRouter.getParam("appId");
  // console.log(appId);

  try {
    // get learning center code
    let query = FlowRouter.getQueryParam("query").replace(/ /g, '%2B')
    // console.log(`query: ${query}`);


    let decrptedString = decryptStamp(query).split('&')
    // console.log(`decrptedString: ${decrptedString}`);

    let timestamp = decrptedString[1]
    let lcentercode = decrptedString[0]

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
  calculationModule: function() {

    if (DLearningCenter.find().count() != 0) {

      Session.set('validNumber', true)

      // aggrate fees detail into batch number, sutdent count and total amount
      let id = DLearningCenter.findOne()._id

      if(DLearningCenter.findOne().allowAccess) {
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
        FlowRouter.redirect('/disabledaccess')
      }

    } else {
      Session.set('validNumber', false)
      console.log('no matching student')
    }

  },
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

Template.landingPage.events({
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
            // refresh page upon uploaded
            if (res.result == 1) {
              location.reload();
            }

          })
          .catch(err => console.log(err))
        }
      })
    })
  }
});
