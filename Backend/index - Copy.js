'use strict';
const dbConnect = require('./MongoDB.js');


function main(propertyId = 'YOUR-GA4-PROPERTY-ID', credentialsJsonPath = '') {
  propertyId = '347275412';

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
      let uservar = row.metricValues[0].value;

      jsonArr.push({
        "date": datevar,
        "user_no": uservar
      });


    });
    const dbConnect = require('./MongoDB.js');
    let data = await dbConnect();
   
    let result = await data.insert(jsonArr)
    if (result.acknowledged) {
      console.warn("data is inserted")
    }
    console.log(jsonArr);
  }

  runReport();
 
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));