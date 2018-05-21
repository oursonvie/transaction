import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

LearningCenter = new Mongo.Collection("learningcenter");

LearningCenter.deny({
  insert: function(){
    return !Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  update: function(){
    return !Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  remove: function(){
    return !Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
});

LearningCenter.allow({
  insert: function(){
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  update: function(){
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  remove: function(){
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
});

LearningCenter.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "学习中心名称",
  },
  type: {
    type: String,
    label: "学习中心类型",
    allowedValues: [
      'standalone',
      'multiple'
    ],
    autoform: {
         options: [
            {
               label: '独立学习中心',
               value: 'standalone'
            },
            {
               label: '非独立学习中心',
               value: 'multiple'
            }
         ]
    },
    autoValue: function() {
      if (this.isInsert) {
        if (!this.value) {
          return 'standalone'
        }
      }
    }
  },
  createdBy: {
    type: String,
    autoValue:function(){
      if (this.isInsert) {
        return this.userId
      }
     },
     autoform: {
       type: 'hidden'
     }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date
      }
    },
     autoform: {
       type: 'hidden'
     }
  },
  updateAt: {
    type: Date,
    autoValue: function() {
        return new Date
    },
    autoform: {
       type: 'hidden'
     }
  }
}, { tracker: Tracker }));
