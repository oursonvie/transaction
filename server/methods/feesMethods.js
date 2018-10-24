Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

Meteor.methods({
  totalFee: async function() {
    let pipeline = [
      { $group:
        {
          _id:"$STUDENTSTYLE",
          count: {$sum:1},
          totalFee:{$sum:'$MONEY'}
        }
      }
    ]

    let result = await Transactions.aggregate(pipeline);

    return result
  },
  districtCenterPersonFees: function(DCenterId) {
    let lcenterObjList = DLearningCenter.findOne({_id:DCenterId}).sublearningcenter

    if (lcenterObjList.length == 2) {
      let result = []
      lodash.forEach(lcenterObjList, function(center) {
        let tempArray = []
        let temp = {}
        temp.name = center.name

        // convert object into array
        tempArray.push(center)

        temp.paymentdetail = arrayCenterTotalFees(tempArray)
        result.push(temp)
      })

      result.type = 1
      return result
    } else {
      // return array of objects with one object
      let array = []
      let result = {}
      result.name = DLearningCenter.findOne({_id:DCenterId}).name
      result.paymentdetail = arrayCenterTotalFees(lcenterObjList)
      // push array
      array.push(result)
      return array
    }
  },
  getSumedTransaction: function() {
    let list = DLearningCenter.find({},{fields:{name:1}}).fetch()
    // console.log(list)

    resultArray = []

    lodash.forEach(list, function(dlcenter) {

      let centerTransaction = Promise.await(PromiseMeteorCall('districtCenterPersonFees', dlcenter._id))

      let totalFees = 0, studentcount = 0, currentratio = 0

      lodash.forEach(centerTransaction, function(lcenter) {

        if (lcenter.paymentdetail && lcenter.paymentdetail.length > 0) {

          // sum student count and total payment
          totalFees += lodash.sumBy(lcenter.paymentdetail, 'totalFee')
          studentcount += lodash.sumBy(lcenter.paymentdetail, 'studentcount')
        }

      })

      let newObj = {}

      newObj.name = dlcenter.name
      newObj.totalFee = totalFees
      newObj.studentcount = studentcount

      // get return ratio
      let lowratio = DLearningCenter.findOne({_id:dlcenter._id}).returnratio
      newObj.currentratio = getRatio(totalFees, lowratio)

      resultArray.push(newObj)

    })

    return resultArray

  }
});
