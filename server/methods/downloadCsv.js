Meteor.methods({
  downloadCurrent:function(batchId){
     return CSV.unparse(SumAchieve.find({byBatch:batchId}, {fields:{_id:0}}).fetch())
  }
});
