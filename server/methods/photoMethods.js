Meteor.methods({
  updatePhotoId:function(dcenterId, batchId, photoId){
     console.log(dcenterId, batchId, photoId)

     let updateObj = {
       batchcode: batchId,
       photoid: photoId,
       createdAt: new Date
     }

     console.log(updateObj)

     // check if batch no already exist in the nested object

     if (DLearningCenter.find( { _id:dcenterId, 'uploadedPic.batchcode':batchId }).count() == 0) {
       // new batchID just add to the array
       result = DLearningCenter.update(
         { _id:dcenterId },
         { $push:
           {
             uploadedPic: updateObj
           }
         }
       )

       let message = {type: 'add', result: result}
       return message
     } else {
       result = DLearningCenter.update(
         { _id: dcenterId, 'uploadedPic.batchcode': batchId },
         { $set :
           {
            'uploadedPic.$.photoid': photoId,
            'uploadedPic.$.createdAt': new Date,
            }
          }
       )
     }







  }
});
