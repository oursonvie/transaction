Meteor.publish('dateSubscribe', function(startDate, endDate) {
  if (this.userId) {
    return Transactions.find({
      CREATEDATE:{
        $lt: new Date(endDate),
        $gte: new Date(startDate)
      }
    })
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})


Meteor.publish('LearningCenterList', function() {
  if (this.userId) {
    return LearningCenter.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('AloneLearningCenter', function() {
  if (this.userId) {
    return LearningCenter.find({type:'standalone'})
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('DistrictLearningCenterList', function() {
  if (this.userId) {
    return DLearningCenter.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('DistrictLearningCenter', function(id) {
  console.log(id)
  return DLearningCenter.find({_id:id})
})

Meteor.publish('DLCCode', function(lcentercode) {
  console.log(lcentercode)

  // get image related to this district center
  let picObjArr = DLearningCenter.findOne({'sublearningcenter.lcentercode':lcentercode}).uploadedPic
  let picIdArray = []
  _.forEach(picObjArr, function(photo) {
    picIdArray.push(photo.photoid)
  })

  console.log(picIdArray)

  return [
    DLearningCenter.find({'sublearningcenter.lcentercode':lcentercode}),
    Settings.find({valuename:'batchId'}),
    Images.find({_id:{$in: picIdArray}})
  ]

})

Meteor.publish('sublearningCenter', function(id) {
  if (this.userId) {
    let subClist = DLearningCenter.findOne({_id:id}).sublearningcenter
    let array = lodash.map(subClist, 'name')
    return WorkingPlace.find({LCENTERNAME: {$in: array}})
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('imageStore', function() {
  if (this.userId) {
    return Images.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('districtImageStore', function(ids) {
  return Images.find({_id:{$in: ids}})
})

Meteor.publish('batchId', function() {
  return Settings.find({valuename: 'batchId'})
})
