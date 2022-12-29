const dbConnect = require('./MongoDB.js');

const insertData=async ()=>{
   let data = await dbConnect();
  let result = await data.insert(
      [
          {name:'max 5',city:'micromax'},
          {name:'max 6',city:'sam'},
          

      ]
  )
  if(result.acknowledged)
  {
      console.warn("data is inserted")
  }
}

insertData();