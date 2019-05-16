Meteor.methods({
  insertChongKuanLog:function(object){
     counter = DownloadPDFS.find().count() + 1
     object.insertId = counter
     result = DownloadPDFS.insert(object)
     console.log(`[insert kongkuan] ${result}`)
     return result
  }
});
