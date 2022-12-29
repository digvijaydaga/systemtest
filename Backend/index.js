// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/** Google Analytics Data API sample quickstart application.

 This application demonstrates the usage of the Analytics Data API using
 service account credentials from a JSON file downloaded from
 the Google Cloud Console.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node quickstart_json_credentials.js
 */
 const dbConnect = require('./MongoDB.js');

 
function main(propertyId = 'YOUR-GA4-PROPERTY-ID', credentialsJsonPath = '') {
  // [START analyticsdata_json_credentials_quickstart]
  /**
   * TODO(developer): Uncomment this variable and replace with your
   *   Google Analytics 4 property ID before running the sample.
   */
  propertyId = '347275412';

  // [START analyticsdata_json_credentials_initialize]
  /** TODO(developer): Uncomment this variable and replace with a valid path to
   *  the credentials.json file for your service account downloaded from the
   *  Cloud Console.
   */
  credentialsJsonPath = 'credentials.json';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Explicitly use service account credentials by specifying
  // the private key file.
  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: credentialsJsonPath,
  });
  // [END analyticsdata_json_credentials_initialize]

  // Runs a simple report.
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
    // [END analyticsdata_json_credentials_run_report]
   //var jsonStr = "";
    //console.log('Report result:');
    // response.rows.forEach(row => {
       // var fdata = row.dimensionValues[0].value;
        //console.log(fdata);
        // json += "\"" City"\" : \"" + fdata + "\"";
      
    // });
   // json += " }";
   var jsonArr = [];
   response.rows.forEach(row => {
    let datevar = row.dimensionValues[0].value;
    let uservar = row.metricValues[0].value;
    //console.log(row.dimensionValues[0]);
    //console.log(row.metricValues[0]);
    jsonArr.push({
      "date": datevar,
      "user_no": uservar
  });

    //console.log(datevar, uservar);
  });
  const dbConnect = require('./MongoDB.js');
  let data = await dbConnect();
  let dataget = await data.deleteMany({});
  
  // let InsertData = JSON.stringify(jsonArr);
 // let InsertData = JSON.stringify(jsonArr);

//  let duplicate =   await data.count(jsonArr);
//  if(duplicate){
//    let duplicate =   await data.find(jsonArr);
//       if(duplicate){
//         console.log('du');
//       }
//  }else{
//   console.log('new');
//  }


  let result = await data.insert(jsonArr)
  if(result.acknowledged)
  {
      console.warn("data is inserted")
  }
     console.log(jsonArr);
  }

  runReport();
  // [END analyticsdata_json_credentials_quickstart]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));