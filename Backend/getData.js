const {MongoClient} = require('mongodb')
const url= 'mongodb://0.0.0.0:27017/';
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test_job");
  dbo.collection("analytics_data").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    db.close();
  });
});