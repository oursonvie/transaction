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

Meteor.publish('DistrictLearningCenterList', function() {
  if (this.userId) {
    return DLearningCenter.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('DistrictLearningCenter', function(id) {
  if (this.userId) {
    return DLearningCenter.find({_id:id})
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
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
