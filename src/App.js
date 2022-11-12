import './App.css';
import React from 'react'
import { Chart } from "react-google-charts";
import fullDataMerged from './data/fullDataMerged.json'
import navIcon from "./image/navIcon.svg"

function App() {
  const [selectCity, setSelectCity] = React.useState("ANDHRA PRADESH")
  const [selectCityOne, setSelectCityOne] = React.useState("ANDHRA PRADESH")
  const [selectCityTwo, setSelectCityTwo] = React.useState("ARUNACHAL PRADESH")
  const [data, setData] = React.useState("");
  const [dataPie, setDataPie] = React.useState("")
  const [dataTotal, setDataTotal] = React.useState("");
  const [dataYearly, setDataYearly] = React.useState("");
  const [selectCityOneData, setSelectCityOneData] = React.useState("")
  const [selectCityTwoData, setSelectCityTwoData] = React.useState("")
  const [diffdata, setDiffData] = React.useState("")
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
  function handleChangeCompareOne(e) {
    setSelectCityOne(e.target.value.toUpperCase())
  }
  function handleChangeCompareTwo(e) {
    setSelectCityTwo(e.target.value.toUpperCase())
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
    // let temp = fullDataMerged.filter((val) => {
    //   if (val.STATE_UT.toUpperCase() === selectCity) {
    //     let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = val
    //     selectCityOneData({ STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION })
    //     return
    //   }
    // })
    for (let i of fullDataMerged) {
      if (i.STATE_UT.toUpperCase() === selectCityOne) {
        let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = i
        setSelectCityOneData({ STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION })
      }
    }
  }, [selectCityOne])
  console.log(selectCityOneData)
  React.useEffect(() => {
    for (let i of fullDataMerged) {
      if (i.STATE_UT.toUpperCase() === selectCityTwo) {
        let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = i
        setSelectCityTwoData({ STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION })
      }
    }
  }, [selectCityTwo])
  console.log(selectCityTwoData)
  React.useEffect(() => {
    const d1 = [
      ["STATE_UT", selectCityOneData.STATE_UT],
      ["MURDER", selectCityOneData.MURDER],
      ["ROBBERY", selectCityOneData.ROBBERY],
      ["KIDNAPPING_AND_ABDUCTION", selectCityOneData.KIDNAPPING_AND_ABDUCTION]
    ]
    const d2 = [
      ["STATE_UT", selectCityTwoData.STATE_UT],
      ["MURDER", selectCityTwoData.MURDER],
      ["ROBBERY", selectCityTwoData.ROBBERY],
      ["KIDNAPPING_AND_ABDUCTION", selectCityTwoData.KIDNAPPING_AND_ABDUCTION]
    ]
    setDiffData({ "old": d1, "new": d2 })
  }, [selectCityOneData, selectCityTwoData])
  React.useEffect(() => {
    let temp = fullDataMerged.map((obj) => {
      const { STATE_UT, TOTAL_IPC_CRIMES } = obj
      return { STATE_UT, TOTAL_IPC_CRIMES }
    })
    let title = [];
    let value = [];
    for (let i of temp) {
      // console.log(i)
      title.push(i.STATE_UT)
      value.push(i.TOTAL_IPC_CRIMES)
    }
    setDataTotal({ title, value })
  }, [])

  // console.log(dataTotal)
  React.useEffect(() => {

    let { STATE_UT, MURDER, ROBBERY, KIDNAPPING_AND_ABDUCTION } = data
    setDataPie([["STATE_UT", STATE_UT], ["MURDER", MURDER], ["ROBBERY", ROBBERY], ["KIDNAPPING", KIDNAPPING_AND_ABDUCTION]])
  }, [data])

  // console.log(data)
  // console.log(selectCity)
  // console.log(setDataPie)

  React.useEffect(() => {
    const temp = [
      ["YEAR",
        "MURDER",
        "ROBBERY",
        "KIDNAPPING_AND_ABDUCTION",
      ],
      ["2007/08", 32212, 19981, 28894],
      ["2008/09", 31817, 21894, 31324],
      ["2009/10", 32770, 22794, 35232],
      ["2010/11", 33762, 29138, 40892],
      ["2011/12", 33913, 26735, 43622],
    ];
    setDataYearly(temp)
  }, [])
  return (

    <div >
      <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px", fontWeight: "bolder" }}>Crime Analytics <img src={navIcon} style={{ height: "50%", marginLeft: "10px" }} /></nav>
      <div className='sectionZero sectionOne'>
        <h1 style={{ width: "80%", textAlign: "left", marginTop: "30px" }}>Crime in different states (2008-2012)</h1>
        <Chart
          chartType="ColumnChart"
          // data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
          data={[dataTotal.title, dataTotal.value]}
          width="100%"
          height="600px"
          legendToggle
          orientation=""
        />
      </div>
      <div className='sectionOne'>
        <h1 style={{ width: "80%", textAlign: "left", marginTop: "20px" }}>Check crime by states (2008-2012)</h1>
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
      <div className='sectionTwo sectionOne'>
        <h1 style={{ width: "80%", textAlign: "left", marginTop: "30px", marginBottom: "50px" }}>Yearly Projection (All States)</h1>
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={dataYearly}
          options={{
            title: "Yearwise Projection",
            vAxis: { title: "Crime Count" },
            hAxis: { title: "Year" },
            seriesType: "bars",
            series: { 5: { type: "line" } },
            is3D: true,
          }}
        />
      </div>
      <div className='sectionThree sectionOne'>
        <h1 style={{ width: "80%", textAlign: "left", marginTop: "30px", marginBottom: "50px" }}>Compare B/W states</h1>
        <div style={{ display: 'flex', width: "80%" }}>
          <select
            id="selectCity"
            name="selectCityOne"
            value={selectCityOne}
            onChange={handleChangeCompareOne}
          >
            <option value="">-- Choose --</option>
            {state.map(value => <option value={value.toUpperCase()} key={value}>{value}</option>)}
          </select>
          <h3 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>V/S</h3>
          <select
            id="selectCity"
            name="selectCityTwo"
            value={selectCityTwo}
            onChange={handleChangeCompareTwo}
          >
            <option value="">-- Choose --</option>
            {state.map(value => <option value={value.toUpperCase()} key={value}>{value}</option>)}
          </select>
        </div>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="600px"
          diffdata={diffdata}

        />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
