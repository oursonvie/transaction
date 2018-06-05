let oracledb = require('oracledb');

updateTransactionDB = () => {

  console.log('Transaction fetching')
  // start timing
  let start_proc = Date.now()

  const connection = Promise.await(oracledb.getConnection({
        user: 'oems',
        password: 'xjoems',
        connectString: '192.168.200.189/oems'
      }));

  const result = Promise.await(connection.execute("SELECT * FROM FY_LCENTER_CHINAPAY_DETAIL_V",
  [],
    {
      outFormat: oracledb.OBJECT,
      resultSet: true
     },
  ))

  const resultSet = result.resultSet
  let queryingPro = true
  let queryingResult = []
  // while loop breaks when there is no more data in resultset, however the while will run once more to break it, therefore the counter is init at -1
  let counter = -1

  while (queryingPro) {
    let singleRow = Promise.await(result.resultSet.getRow())
    if (singleRow) {
      singeTransaction = singleRow
      singeTransaction.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss")
      // return query result
      queryingResult.push(singleRow)

      // console.log(singeTransaction)

      // add then to local DB
      Transactions.insert(singeTransaction)

    } else {
      queryingPro = false
    }
    counter += 1
  }

  let end_proc = Date.now()
  let proc_duration = end_proc - start_proc

  let message = `Transaction fetched: ${queryingResult.length}, process took ${proc_duration}ms`

  console.log(message)

  doClose(connection, resultSet);

  // update current batchID
  Settings.upsert({
    valuename:"oracleUpdateBy"
  }, {
    $set:{value:new Date}
  })

  return queryingResult

}

// release connection after fetching all the data needed

let doRelease = function (connection)
{
  connection.close(
    function(err)
    {
      if (err) { console.error(err.message); }
    });
}

let doClose = function (connection, resultSet)
{
  resultSet.close(
    function(err)
    {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}
