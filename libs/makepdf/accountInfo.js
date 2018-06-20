let checkUndefined = (input) => {
  if (input == undefined) {
    return ' '
  } else {
    return input
  }
}

accountInfo = (lcenter, xjtu) => {
  return [
    [
      {text: `项目`, style:'centerTable'},
      {text: `学习中心`, style:'centerTable'},
      {text: `学校`, style:'centerTable'}
    ],
    [
      {text: `银行账户名称`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.name)}`, style:'centerTable'},
      {text: `${xjtu.name}`, style:'centerTable'}
    ],
    [
      {text: `账号`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.accountno)}`, style:'centerTable'},
      {text: `${xjtu.accountno}`, style:'centerTable'}
    ],
    [
      {text: `开户行`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.branchname)}`, style:'centerTable'},
      {text: `${xjtu.branchname}`, style:'centerTable'}
    ],
    [
      {text: `汇款省市`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.province)}`, style:'centerTable'},
      {text: `${xjtu.province}`, style:'centerTable'}
    ],
    [
      {text: `汇款备注`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.memo)}`, style:'centerTable'},
      {text: `${xjtu.memo}`, style:'centerTable'}
    ],
    [
      {text: `联系人`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.contact)}`, style:'centerTable'},
      {text: `${xjtu.contact}`, style:'centerTable'}
    ],
    [
      {text: `联系电话`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.contactno)}`, style:'centerTable'},
      {text: `${xjtu.contactno}`, style:'centerTable'}
    ],
    [
      {text: `传真`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.fax)}`, style:'centerTable'},
      {text: `${xjtu.fax}`, style:'centerTable'}
    ],
    [
      {text: `详细地址`, style:'centerTable'},
      {text: `${checkUndefined(lcenter.address)}`, style:'centerTable'},
      {text: `${xjtu.address}`, style:'centerTable'}
    ]
  ]
}
