import './App.css';
import React from 'react'
import { Chart } from "react-google-charts";
import fullDataMerged from './data/fullDataMerged.json'

function App() {
  const [selectCity, setSelectCity] = React.useState("ANDHRA PRADESH")
  const [data, setData] = React.useState("");
  const [dataPie, setDataPie] = React.useState("")
  let state = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]
  // console.log(fulldata2008)
  function handleChange(e) {
    setSelectCity(e.target.value.toUpperCase());
  }

  React.useEffect(() => {
    let temp = fullDataMerged.filter((val) => {
      // console.log(val.STATE_UT + "  ====  " + selectCity)
      if (val.STATE_UT.toUpperCase() === selectCity) {
        let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = val
        setData({ STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION })
        // setData(val)
        return
      }
    })
    // let { MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = temp[0]
    // setData({ MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION })
    // setData(temp)
  }, [selectCity])

  React.useEffect(() => {

    let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = data
    setDataPie([["STATE_UT", STATE_UT], ["MURDER", MURDER], ["ROBBERY", ROBBERY], ["KIDNAPPING", KIDNAPPING_AND_ABDUCTION]])
  }, [data])

  console.log(data)
  console.log(selectCity)
  // console.log(setDataPie)
  return (
    <div >
      <div className='sectionOne'>
        <h1 style={{ width: "80%", textAlign: "left", marginTop: "20px" }}>Check crime by states</h1>
        <select
          id="selectCity"
          name="selectCity"
          value={selectCity}
          onChange={handleChange}
        >
          <option value="">-- Choose --</option>
          {state.map(value => <option value={value.toUpperCase()} key={value}>{value}</option>)}
        </select>
        <Chart
          chartType="BarChart"
          // data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
          data={[Object.keys(data), Object.values(data)]}
          width="100%"
          height="600px"
          legendToggle
          orientation=""
        />
        <Chart
          chartType="PieChart"
          data={dataPie}
          options={{
            title: "Crime Share",
            is3D: true,
          }}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
}

export default App;
