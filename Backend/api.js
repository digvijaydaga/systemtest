const express = require('express');
const dbConnect = require('./MongoDB');
const app = express();


function main(propertyId = 'YOUR-GA4-PROPERTY-ID', credentialsJsonPath = '') {
  propertyId = '347275412';
  var moment = require('moment'); // require
  moment().format();
  credentialsJsonPath = 'credentials.json';

  // Imports the Google Analytics Data API client library.
  const { BetaAnalyticsDataClient } = require('@google-analytics/data');

  // Explicitly use service account credentials by specifying
  // the private key file.
  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: credentialsJsonPath,
  });

  async function runReport() {
    // [START analyticsdata_json_credentials_run_report]
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',

        },

      ],

      metrics: [
        {
          name: 'activeUsers',
        },

      ],
    });

    var jsonArr = [];
    response.rows.forEach(row => {
      let datevar = row.dimensionValues[0].value;
      let dateVal = moment(datevar).format('DD/MM/YYYY');

      let uservar = row.metricValues[0].value;

      jsonArr.push({
        "date": dateVal,
        "user_no": uservar
      });


    });
    const dbConnect = require('./MongoDB.js');
    let data = await dbConnect();

    let dataget = await data.deleteMany({});
    let result = await data.insert(jsonArr)
    if (result.acknowledged) {
      console.warn("data is inserted")
    }
    console.log(jsonArr);
  }

  runReport();

}

app.get('/getData', async (req, resp) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "X-Requested-With");
  let data = await dbConnect();
  data = await data.find().toArray();
  resp.send(data)
});
app.get('/insertData', async (req, resp) => {
  main(...process.argv.slice(2));
  resp.send("Data inserted")
});
app.listen(5100);