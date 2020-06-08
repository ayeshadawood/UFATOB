import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// import FullWidthTabs from "./FullWidthTabs";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withRouter, Link } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const UniversitiesList = ({ history }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add/Update Institution</h4>
              <p className={classes.cardCategoryWhite}>
                Fill in the information to add/update an institution
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Institution Name"
                    id="institution-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Branch Code"
                    id="branch-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/* <GridContainer> */}
              {/* <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Mongo database URL"
                    id="database-url"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  /> */}
              {/* <Button color="success">Click here</Button> */}
              {/* </GridItem> */}
              {/* <GridItem xs={12} sm={12} md={4}>
                  <Button color="success">Click here</Button>
                </GridItem> */}
              {/* </GridContainer> */}
            </CardBody>
            <CardFooter>
              <Button color="primary">Submit</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Universities List</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the registered universities
              </p>
            </CardHeader>
            <CardBody>
              {/* <FullWidthTabs /> */}
              {/* <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Institution Name"
                  id="institution-name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Branch Code"
                  id="branch-code"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Email address"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer> */}

              {/* <Link to="/admin/add-institution">
                <Button color="primary">Add Institution</Button>
              </Link> */}

              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "NAME", "EMAIL", "BRANCH CODE", "ACTIONS"]}
                tableData={[
                  [
                    "1",
                    "Comsats",
                    "comsats@gmail.com",
                    "BA123",
                    <Fragment>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon + " " + classes.close
                          }
                        />
                      </IconButton>
                    </Fragment>,
                  ],
                  // ["Minerva Hooper", "Curaçao", "Sinaai-Waas"],
                  // ["Sage Rodriguez", "Netherlands", "Baileux"],
                  // ["Philip Chaney", "Korea, South", "Overland Park"],
                  // ["Doris Greene", "Malawi", "Feldkirchen in Kärnten"],
                  // ["Mason Porter", "Chile", "Gloucester"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park",
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
      </GridContainer>
    </Fragment>
  );
};

UniversitiesList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(UniversitiesList);
