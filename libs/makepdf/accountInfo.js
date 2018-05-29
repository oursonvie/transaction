let checkUndefined = (input) => {
  if (input == undefined) {
    return ' '
  } else {
    return input
  }
}

accountInfo = (lcenter, xjtu) => {
  return [
    [`项目`,`学习中心`,`学校`],
    [`银行账户名称`, `${checkUndefined(lcenter.name)}`, `${xjtu.name}`],
    [`账号`, `${checkUndefined(lcenter.accountno)}`, `${xjtu.accountno}`],
    [`开户行`, `${checkUndefined(lcenter.branchname)}`, `${xjtu.branchname}`],
    [`汇款省市`, `${checkUndefined(lcenter.province)}`, `${xjtu.province}`],
    [`汇款备注`, `${checkUndefined(lcenter.memo)}`, `${xjtu.memo}`],
    [`联系人`, `${checkUndefined(lcenter.contact)}`, `${xjtu.contact}`],
    [`联系电话`, `${checkUndefined(lcenter.contactno)}`, `${xjtu.contactno}`],
    [`传真`, `${checkUndefined(lcenter.fax)}`, `${xjtu.fax}`],
    [`详细地址`, `${checkUndefined(lcenter.address)}`, `${xjtu.address}`]
  ]
}
