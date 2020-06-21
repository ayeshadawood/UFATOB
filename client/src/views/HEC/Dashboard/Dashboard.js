import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {
  getDataStatisticsByUniversity,
  getDataStatisticsByYear,
} from '../../../actions/dataVisualization';
import { Typography } from '@material-ui/core';

const Dashboard = ({
  dataVisualization: { loading, university, year },
  getDataStatisticsByUniversity,
  getDataStatisticsByYear,
}) => {
  const [universityChartDataLoaded, setUniversityChartDataLoaded] = useState(
    false
  );

  const [yearChartDataLoaded, setYearChartDataLoaded] = useState(false);

  const universityChart = useRef(null);
  const yearChart = useRef(null);

  // This function gets the labels for univeristy chart
  const getUniversityChartLabels = () => {
    let res = [];
    for (let key in university) {
      res = [...res, key];
    }
    return res;
  };

  // This function gets the data for the univeristy chart
  const getUniversityChartData = () => {
    let res = [];
    for (let key in university) {
      res = [...res, university[key]];
    }
    return res;
  };

  // This function generates random background colors for chart
  const generateUniversityChartBackgroundColors = () => {
    let res = [];
    let count = 0;

    // eslint-disable-next-line
    for (let key in university) {
      count++;
    }

    for (let i = 0; i < count; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      res = [...res, `rgba(${red}, ${green}, ${blue}, 0.8)`];
    }

    return res;
  };

  // This functions loads the chart for university data
  const loadUniversityChart = () => {
    const ctx = universityChart.current.getContext('2d');
    ctx.clearRect(
      0,
      0,
      universityChart.current.width,
      universityChart.current.height
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: getUniversityChartLabels(),
        datasets: [
          {
            label: 'Funding in Rs',
            data: getUniversityChartData(),
            backgroundColor: generateUniversityChartBackgroundColors(),
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  // This function generates random rgb values
  const generateRandomRGBValues = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return [red, green, blue];
  };

  // This functions get the data for year chart
  const getYearChartData = () => {
    // This function checks if an entry exists in provided year or not
    const doesInstituteEntryExistInYear = (institute, yearEntry) => {
      let res = false;
      for (let instituteName in year[yearEntry]) {
        if (instituteName === institute) {
          res = true;
          break;
        }
      }
      return res;
    };

    // This function checks if an institute entry already exists in datasets or not
    const doesInstituteEntryExistInDatasets = (institute, datasets) => {
      let res = false;
      for (let i = 0; i < datasets.length; i++) {
        const dataset = datasets[i];
        if (dataset.label === institute) {
          res = true;
          break;
        }
      }
      return res;
    };

    let res = { labels: [], datasets: [] };

    // Getting the unique institute entries
    let institutes = [];
    for (let yearEntry in year) {
      res.labels = [...res.labels, yearEntry];
      for (let instituteName in year[yearEntry]) {
        if (institutes.indexOf(instituteName) === -1) {
          institutes = [...institutes, instituteName];
        }
      }
    }

    // Populating the datasets
    for (let yearEntry in year) {
      for (let i = 0; i < institutes.length; i++) {
        const institute = institutes[i];
        if (!doesInstituteEntryExistInDatasets(institute, res.datasets)) {
          const colors = generateRandomRGBValues();

          res.datasets = [
            ...res.datasets,
            {
              label: institute,
              data: [
                doesInstituteEntryExistInYear(institute, yearEntry)
                  ? year[yearEntry][institute]
                  : 0,
              ],
              backgroundColor: `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.5)`,
              borderColor: `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1)`,
              borderWidth: 2,
              fill: false,
              pointRadius: 4,
            },
          ];
        } else {
          res.datasets.map((dataset) => {
            if (dataset.label === institute) {
              dataset.data = [
                ...dataset.data,
                doesInstituteEntryExistInYear(institute, yearEntry)
                  ? year[yearEntry][institute]
                  : 0,
              ];
            }
            return dataset;
          });
        }
      }
    }

    return res;
  };

  // This function loads the chart for year data
  const loadYearChart = () => {
    const ctx = yearChart.current.getContext('2d');
    ctx.clearRect(0, 0, yearChart.current.width, yearChart.current.height);

    new Chart(ctx, {
      type: 'line',
      data: getYearChartData(),
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    if (!universityChartDataLoaded) {
      getDataStatisticsByUniversity();
      setUniversityChartDataLoaded(true);
    }

    if (!yearChartDataLoaded) {
      getDataStatisticsByYear();
      setYearChartDataLoaded(true);
    }

    if (!loading && university !== null) {
      loadUniversityChart();
    }

    if (!loading && year !== null) {
      loadYearChart();
    }

    // eslint-disable-next-line
  }, [
    getDataStatisticsByUniversity,
    loadUniversityChart,
    loadYearChart,
    loading,
  ]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant='h4' style={{ marginBottom: '10px' }}>
            Per Institution Funding
          </Typography>
          <canvas ref={universityChart}></canvas>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant='h4' style={{ marginBottom: '10px' }}>
            Per Year Funding
          </Typography>
          <canvas ref={yearChart}></canvas>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Dashboard.propTypes = {
  dataVisualization: PropTypes.object.isRequired,
  getDataStatisticsByUniversity: PropTypes.func.isRequired,
  getDataStatisticsByYear: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dataVisualization: state.dataVisualization,
});

export default connect(mapStateToProps, {
  getDataStatisticsByUniversity,
  getDataStatisticsByYear,
})(Dashboard);
