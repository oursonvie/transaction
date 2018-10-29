Meteor.methods({
  downloadCurrent:function(batchId){
     return CSV.unparse(SumAchieve.find({batchId:batchId}, {fields:{_id:0, batchId:0}}).fetch())
  }
});
