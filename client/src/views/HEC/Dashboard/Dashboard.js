import React, { useRef, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import { makeStyles } from '@material-ui/core/styles';
import AccessTime from '@material-ui/icons/AccessTime';
import BugReport from '@material-ui/icons/BugReport';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Table from '../../../components/Table/Table.js';
import Tasks from '../../../components/Tasks/Tasks.js';
import CustomTabs from '../../../components/CustomTabs/CustomTabs.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import CardFooter from '../../../components/Card/CardFooter.js';
import Chart from 'chart.js';

import { bugs } from '../../../variables/general.js';

import { emailsSubscriptionChart } from '../../../variables/charts.js';

import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const barChartRef = useRef(null);

  const loadBarChart = () => {
    const ctx = barChartRef.current.getContext('2d');
    // Line chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2016', '2017', '2018', '2019', '2020'],
        datasets: [
          {
            label: 'Comsats',
            data: [12, 19, 3, 20, 2],
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 2,
            fill: false,
            pointRadius: 4,
          },
          {
            label: 'Nust',
            data: [13, 15, 13, 50, 22],
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 2,
            fill: false,
            pointRadius: 4,
          },
        ],
      },
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

    // Bar chart
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //       {
    //         label: 'Funding in Rs.',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: 'rgba(0, 0, 255, 0.5)',
    //         borderColor: 'rgba(0, 0, 255, 1)',
    //         borderWidth: 2,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  };

  useEffect(() => {
    loadBarChart();
  }, [loadBarChart]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <canvas
            ref={barChartRef}
            style={{ height: '400px !important' }}
          ></canvas>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={emailsSubscriptionChart.data}
                type='Line'
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Per Year Funding</h4>
              <p className={classes.cardCategory}>
                Total funding throughout the years
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={emailsSubscriptionChart.data}
                type='Bar'
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Per Institution Funding</h4>
              <p className={classes.cardCategory}>
                Total funding throughout the institutions
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={emailsSubscriptionChart.data}
                type='Bar'
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Per Program Funding</h4>
              <p className={classes.cardCategory}>
                Total funding throughout the programs
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="TODO's:"
            headerColor='primary'
            tabs={[
              {
                tabName: 'Queries',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='warning'>
              <h4 className={classes.cardTitleWhite}>Recent fundings</h4>
              <p className={classes.cardCategoryWhite}>Latest 5 fundings</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='warning'
                tableHead={['ID', 'Recipient', 'Type', 'Amount']}
                tableData={[
                  ['1', 'Comsats', 'Laptop Scheme', '$36,738'],
                  // ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  // ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  // ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
