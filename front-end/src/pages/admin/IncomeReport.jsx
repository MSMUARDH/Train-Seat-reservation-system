import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const IncomeReport = () => {
  const [data, setData] = useState([]);
  const getTrainDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-income-report-by-train"
      );
      setData(response.data.totalAmountDetails);
    } catch (error) {}
  };

  useEffect(() => {
    getTrainDetails();
  }, []);

  const seriesArray = [];
  const labelsArray = [];

  data.map((item) => {
    seriesArray.push(item[0].TotalAmount);
    labelsArray.push(item[0].TrainName);
  });

  return (
    <React.Fragment>
      <h1></h1>

      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "40px",
        }}
      >
        Total income by trains
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chart
          type="pie"
          series={seriesArray}
          options={{
            labels: labelsArray,
          }}
          width={550}
          height={1349}
        ></Chart>
      </div>
    </React.Fragment>
  );
};

export default IncomeReport;
