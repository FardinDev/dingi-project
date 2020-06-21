import React, { Component } from "react";
import AppNavBar from "../../Layouts/AppNavbar/AppNavbar";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { connect } from "react-redux";
import { authState } from "../../../Redux/Actions/AuthAction";
const colors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
  "rgba(255, 170, 51, 0.5)",
];

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );

    return result;
  }, {});
};
const getOrderQuantity = (array) => {
  let tempCount = 0;
  Object.keys(array).forEach(function (j) {
    tempCount += array[j].order_quantity;
  });
  return tempCount;
};

const getTheDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-01";
  return today;
};
const compareDate = (d) => {
  let d1 = new Date(getTheDate());
  let d2 = new Date(d);
  return d1.getTime() <= d2.getTime();
};
const getThisMonthData = (data) => {
  let dates = [];
  Object.keys(data).forEach(function (j) {
    if (!compareDate(data[j].date)) {
      dates.push(data[j].date);
    }
  });

  let filteredData = data;
  Object.keys(dates).forEach(function (j) {
    filteredData = filteredData.filter(function (item) {
      return item.date !== dates[j];
    });
  });

  return filteredData;
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.loardSalesChart = this.loardSalesChart.bind(this);
    this.loardCustomersChart = this.loardCustomersChart.bind(this);
    this.renderSalesCharts = this.renderSalesCharts.bind(this);
    this.renderCustomersCharts = this.renderCustomersCharts.bind(this);
  }
  state = {
    dataFromAPI: [],
    barChartTitile: "Loading...",
    pieChartTitile: "Loading...",
    barChartXAxesTitile: "Loading...",
    barChartYAxesTitile: "Loading...",
    sales: true,
    customers: false,
    barChartData: {
      labels: [],
      datasets: [],
    },
    pieChartData: {
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
      labels: [],
    },
  };

  componentDidMount() {
    let self = this;
    axios
      .get("http://frontend.interview.dingi.work/user/data/", {
        headers: {
          Authorization: `JWT ${self.props.auth.token}`,
        },
      })
      .then(function (response) {
        self.setState({
          dataFromAPI: response.data,
        });

        self.renderSalesCharts(self.state.dataFromAPI);
      })
      .catch(function (error) {
        console.log(error);
        self.props.authState(false, "");
        self.props.history.push("/login");
      });
  }

  renderSalesCharts(data) {
    let thisMonthData = getThisMonthData(data);

    this.setState({
      sales: true,
      customers: false,
      barChartTitile: "Product Wise Order Quantity",
      pieChartTitile: "Product Wise Comparison of Order Quantities",
      barChartXAxesTitile: "Dates",
      barChartYAxesTitile: "Order Quantities (In Number)",
    });
    let dataset = [];
    let productCount = [];

    let groupByDate = groupBy(thisMonthData, "date");
    let groupByProductName = groupBy(thisMonthData, "product");

    let dates = Object.keys(groupByDate);
    dates.sort();
    let products = Object.keys(groupByProductName);
    products.sort();

    Object.keys(dates).forEach(function (index) {
      groupByDate[dates[index]] = groupBy(groupByDate[dates[index]], "product");
    });

    Object.keys(products).forEach(function (i) {
      let tempData = [];
      Object.keys(dates).forEach(function (j) {
        let count = groupByDate[dates[j]][products[i]]
          ? getOrderQuantity(groupByDate[dates[j]][products[i]])
          : 0;
        tempData.push(count);
      });
      dataset.push({
        label: products[i],
        backgroundColor: colors[i],
        data: tempData,
      });
      productCount.push(tempData.reduce((a, b) => a + b, 0));
    });

    this.setState({
      barChartData: {
        labels: dates,
        datasets: dataset,
      },
    });

    this.setState({
      pieChartData: {
        datasets: [
          {
            backgroundColor: colors,
            data: productCount,
          },
        ],
        labels: products,
      },
    });
  }
  renderCustomersCharts(data) {
    let thisMonthData = getThisMonthData(data);
    this.setState({
      sales: false,
      customers: true,
      barChartTitile: "District Wise Customer Counts",
      pieChartTitile: "Working Area Wise Customer Counts",
      barChartXAxesTitile: "Dates",
      barChartYAxesTitile: "Customer Count (In Number)",
    });
    let dataset = [];

    let groupByDate = groupBy(thisMonthData, "date");
    let groupByDistrict = groupBy(thisMonthData, "district");
    let groupByWorkArea = groupBy(thisMonthData, "customer_work_area");

    let dates = Object.keys(groupByDate);
    dates.sort();

    let districts = Object.keys(groupByDistrict);
    districts.sort();
    let workAreas = Object.keys(groupByWorkArea);
    workAreas.sort();

    Object.keys(dates).forEach(function (index) {
      groupByDate[dates[index]] = groupBy(
        groupByDate[dates[index]],
        "district"
      );
    });

    Object.keys(districts).forEach(function (i) {
      let tempData = [];
      Object.keys(dates).forEach(function (j) {
        let count = groupByDate[dates[j]][districts[i]]
          ? groupByDate[dates[j]][districts[i]].length
          : 0;
        tempData.push(count);
      });
      dataset.push({
        label: districts[i],
        backgroundColor: colors[i],
        data: tempData,
      });
    });

    this.setState({
      barChartData: {
        labels: dates,
        datasets: dataset,
      },
    });

    let workAreaWiseCustomerCount = [];
    Object.keys(workAreas).forEach(function (j) {
      let count = groupByWorkArea[workAreas[j]].length;
      workAreaWiseCustomerCount.push(count);
    });

    this.setState({
      pieChartData: {
        datasets: [
          {
            backgroundColor: colors,
            data: workAreaWiseCustomerCount,
          },
        ],
        labels: workAreas,
      },
    });
  }

  loardSalesChart() {
    this.renderSalesCharts(this.state.dataFromAPI);
  }
  loardCustomersChart() {
    this.renderCustomersCharts(this.state.dataFromAPI);
  }
  render() {
    return (
      <div>
        <AppNavBar />
        <div className="sidenav">
          <a
            className={this.state.sales ? "active" : null}
            href="#sales"
            onClick={this.loardSalesChart}
          >
            Sales
          </a>
          <a
            className={this.state.customers ? "active" : null}
            href="#customers"
            onClick={this.loardCustomersChart}
          >
            Customers
          </a>
        </div>

        <div className="main p-2">
          <div className="bg-light p-2 mb-2">
            <Bar
              data={this.state.barChartData}
              width={100}
              height={25}
              options={{
                barValueSpacing: 20,
                title: {
                  display: true,
                  text: this.state.barChartTitile,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        min: 0,
                        beginAtZero: true,
                        callback: function (value) {
                          if (Number.isInteger(value)) {
                            return value;
                          }
                        },
                        stepSize: 2,
                      },
                      scaleLabel: {
                        display: true,
                        labelString: this.state.barChartYAxesTitile,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: this.state.barChartXAxesTitile,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <div className="bg-light p-2">
            <Pie
              data={this.state.pieChartData}
              width={100}
              height={25}
              options={{
                title: {
                  display: true,
                  text: this.state.pieChartTitile,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { authState })(Home);
