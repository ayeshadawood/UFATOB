import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function RequestListTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Priority" {...a11yProps(0)} />
          <Tab label="User Requests" {...a11yProps(1)} />
          <Tab label="Accepted" {...a11yProps(2)} />
          <Tab label="Rejected" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Table
            tableHeaderColor="primary"
            tableHead={[
              "S.NO.",
              "REQUEST ID",
              "TITLE",
              "UNIVERSITY",
              "ACTIONS",
            ]}
            tableData={[
              [
                "1",
                "AB123",
                "Scholarship request for bachelors",
                "Comsats",
                <Button color="primary">Open</Button>,
              ],
            ]}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Table
            tableHeaderColor="primary"
            tableHead={[
              "S.NO.",
              "REQUEST ID",
              "NAME",
              "TITLE",
              "UNIVERSITY",
              "ACTIONS",
            ]}
            tableData={[
              [
                "1",
                "AB123",
                "Haider",
                "Scholarship request for bachelors",
                "Comsats",
                <Button color="primary">Open</Button>,
              ],
            ]}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Table
            tableHeaderColor="primary"
            tableHead={["Name", "Country", "City", "Salary"]}
            tableData={[
              ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              ["Mason Porter", "Chile", "Gloucester", "$78,615"],
            ]}
          />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Table
            tableHeaderColor="primary"
            tableHead={["Name", "Country", "City", "Salary"]}
            tableData={[
              ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              ["Mason Porter", "Chile", "Gloucester", "$78,615"],
            ]}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
