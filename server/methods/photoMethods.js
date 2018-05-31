Meteor.methods({
  updatePhotoId:function(dcenterId, batchId, photoId){
     console.log(dcenterId, batchId, photoId)

     let updateObj = {
       batchcode: batchId,
       photoid: photoId
     }

     console.log(updateObj)

     result = Images.update(
       { _id:dcenterId },
       { $push:
         {
           'uploadedPic': updateObj
         }
       }
     )

     return result




  }
});
