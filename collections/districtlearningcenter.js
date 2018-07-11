import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

DLearningCenter = new Mongo.Collection("districtlearningcenter");

DLearningCenter.deny({
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

DLearningCenter.allow({
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

DLearningCenter.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "学习中心名称",
  },
  returnratio: {
    type: Number,
    label: "返款比例",
    autoform: {
      type: "select",
      options: () => {
        let avalibleSelection = [0.35, 0.4, 0.6]
        let result = lodash.map(avalibleSelection, function(value) {
          return {
            label: `${100-value*100}% : ${value*100}%`,
            value: value
          }
        })
        return result
      }
    }
  },
  alloweduser: {
    type: String,
    label: "用户白名单",
    optional: true
  },
  bankaccountdetail: {
    label: '',
    type: Object,
    optional: true
  },
  'bankaccountdetail.name':{
    label: '银行账户名称',
    type: String
  },
  'bankaccountdetail.accountno':{
    label: '账号',
    type: String
  },
  'bankaccountdetail.branchname':{
    label: '开户行',
    type: String
  },
  'bankaccountdetail.province':{
    label: '汇款省市',
    type: String
  },
  'bankaccountdetail.memo':{
    label: '汇款备注',
    type: String,
    optional: true
  },
  'bankaccountdetail.contact':{
    label: '联系人',
    type: String
  },
  'bankaccountdetail.contactno':{
    label: '联系电话',
    type: String
  },
  'bankaccountdetail.fax':{
    label: '传真',
    type: String,
    optional: true
  },
  'bankaccountdetail.address':{
    label: '详细地址',
    type: String,
    autoform: {
      rows: 4
    }
  },
  sublearningcenter: {
    label: "",
    type: Array,
    optional: false
  },
  'sublearningcenter.$':{
    label: "",
    type: Object
  },
  'sublearningcenter.$.name':{
    type: String,
    label: "选择学习中心",
    autoform: {
      type: "select",
      options: () => {
        // have to define on client otherwise things get wired
        if (Meteor.isClient) {
          objArtList = LearningCenter.find({},{fields:{name:1}}).fetch()
          let list = ObjToArr(objArtList, 'name')

          let result =  lodash.map(list, function(value) {
            return {
              label:value,
              value:value
            }
          })
          return lodash.sortBy(result, ['label'])
        }
      }
    }
  },
  'sublearningcenter.$.lcentercode':{
    type: String,
    label: '学习中心编号',
    optional: true,
    autoValue: function() {
      let name = this.siblingField('name').value
      let lcentercode = LearningCenter.findOne({name: name}).lcentercode
      return lcentercode
    },
    autoform: {
       type: 'hidden'
    }
  },
  allowAccess: {
    type: Boolean,
    label: "访问限制",
    defaultValue: false,
    autoform: {
      type: 'boolean-select',
        trueLabel: '允许访问',
        falseLabel: '禁止访问',
        firstOption: '(请选择访问方式)'
    }
  },
  extraAmount: {
    type: Number,
    label: "汇款缴费",
    defaultValue: 0
  },
  uploadedPic: {
    label: '',
    type: Array,
    optional: true
  },
  'uploadedPic.$':{
    label:'',
    type: Object
  },
  'uploadedPic.$.batchcode':{
    label:'批次',
    type: String
  },
  'uploadedPic.$.photoid':{
    label:'相片编号',
    type: String
  },
  'uploadedPic.$.createdAt':{
    label:'创建时间',
    type: Date
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
