import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import "./App.css";
//import Moment from 'react-moment';

const App = () => {
  const [apiData, setData] = useState([]);
  const [jsonUserArr, setJsonUserArr] = useState([]);
  const [jsonDateArr, setJsonDateArr] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5100/getData")
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData)
        apiData.map((table) => {
          jsonDateArr.push(table.date)
          jsonUserArr.push(table.user_no)
        })
		
      })
  }, []);




  return (
    <div>
		{(jsonDateArr.length > 0 && jsonUserArr.length > 0) && <Plot
			data={[
			  {
				x: jsonDateArr,
				y: jsonUserArr,
				type: 'scatter',
				mode: 'lines+markers',
				marker: { color: 'transparent' },
			  },
			  { type: 'bar', x: jsonDateArr, y: jsonUserArr },
			]}
			layout={{ width: 920, height: 540, title: 'User Data' }}
			/>
		}
      <h2>User Data</h2>
      <table>
        <tbody>
          <tr>
            <th>Active Users</th>
            <th>Date</th>
          </tr>

          {apiData.length > 0 && apiData.map((tableData, i) => (
            <tr key={i}>
              <td>{tableData.user_no}</td>
              <td>{tableData.date}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
};

export default App;