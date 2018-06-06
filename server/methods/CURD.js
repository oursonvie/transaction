Meteor.methods({
  removeDLCenter: function(id) {
    if (this.userId) {
      return DLearningCenter.remove({_id:id})
    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  },
  changeAccess: function(id) {
    if (this.userId) {
      // target dcenter

      let target = DLearningCenter.findOne({_id:id})

      result = DLearningCenter.update(
        {_id:id},
        {$set: {
          allowAccess: !target.allowAccess
        }}
      )

      message = {action:'update', target: id, result: result}

      return message

    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  },
  turnOffallDCenter: function() {
    result = DLearningCenter.update({},{$set: { allowAccess: false }}, {multi:true})
    return result
  },
  turnONallDCenter: function() {
    result = DLearningCenter.update({},{$set: { allowAccess: true }}, {multi:true})
    return result
  }
});
