// distinct array
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

arrayCenterTotalFees = (centerName) => {
  // applicatiable for 1 and more than 2 learning center
  let lcenterList = DLearningCenter.findOne({name:centerName}).sublearningcenter
  let centerArrayList = []

  // array with only center name
  _.forEach(lcenterList, function(center) {
    centerArrayList.push(center.name)
  })

  let pipeline = [
    { $match :
      {
        LCENTERNAME:
        {
            $in: centerArrayList
        }
      }
    },
    { $group:
      {
        _id:"$RECRUITBATCHCODE",
        studentcount: {$push: "$STUDENTCODE"},
        totalFee:{$sum:'$MONEY'}
      }
    }
  ]

  console.log(centerArrayList)

  let result = Promise.await(WorkingPlace.aggregate(pipeline))
  let sortedResult = _.sortBy(result, ['_id']);

  _.forEach(sortedResult, function(obj) {
    obj.studentcount = obj.studentcount.unique().length
  })

  console.log(sortedResult)

  return sortedResult
}
