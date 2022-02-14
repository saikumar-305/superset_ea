import React, { useEffect, useState, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import {
  LeftNavLoad,
  getCriteriaAttribute,
} from "../../utilities/createSegmentOperations";
import { CircularProgress, Grid, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FilterContext } from "../../context/FilterContext";
import { getDefinitionByAttributeName } from "../../utilities/segmentDefinitionUtils";

import AttributeListItem from "./segment-definition-creator/AttributeListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

/**
 * JSX component - Left panel for selecting attributes
 * Also has search functionality for attributes
 */
const LeftPanel = () => {
  const classes = useStyles();

  const [leftNavData, setLeftNavData] = useState(null);
  const [filteredNavData, setFilteredData] = useState(null);

  const [criteriaAttributes, setCriteriaAttributes] = useState(null);

  useEffect(() => {
    let mounted = true;
    LeftNavLoad()
      .then((response) => {
        if (!mounted) {
          return;
        }
        setLeftNavData(response.data);
        setFilteredData(response.data); // Initally filtered data will full data
        const isNavOpen = {};
        for (const leftNavCategory of Object.keys(response.data)) {
          isNavOpen[leftNavCategory] = false; // Close/Collapse all the categories initally
        }
        setOpen(isNavOpen);
      })
      .catch(console.error);
    return () => {
      // Clean up
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getCriteriaAttribute()
      .then((response) => {
        if (!mounted) {
          return;
        }
        if (response.status === 200 && response.data)
          setCriteriaAttributes(response.data);
      })
      .catch(console.error)
      .finally();
    return () => {
      // Clean up code
      mounted = false;
    };
  }, []);

  const [isNavOpen, setOpen] = React.useState({});
  const [filteredActive, setFilteredActive] = useState(false);

  // Handler for searching
  const searchHandler = (event) => {
    event.target.value ? setFilteredActive(true) : setFilteredActive(false);
    const filteredResponse = {};
    const filter = new RegExp(event.target.value, "i");
    Object.keys(leftNavData).forEach((category) => {
      filteredResponse[category] = leftNavData[category].filter((attribute) =>
        attribute.TITLE.match(filter)
      );
      // Open categories dropdown on search
      filteredResponse.length
        ? setOpen({ ...isNavOpen, category: true })
        : setOpen({ ...isNavOpen, category: false });
    });
    setFilteredData(filteredResponse);
  };

  const handleClick = (category) => {
    if (filteredActive) {
      return;
    }
    const navOpen = { ...isNavOpen };
    navOpen[category] = !navOpen[category];
    setOpen(navOpen);
  };

  const { addAttribute } = useContext(FilterContext);
  return (
    <React.Fragment>
      {filteredNavData && (
        <List
          style={{
            height: "80vh",
            overflow: "auto",
          }}
          component="nav"
          subheader={
            <Grid container alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField label="Search" onKeyUp={searchHandler} />
              </Grid>
            </Grid>
          }
          className={classes.root}
        >
          {Object.keys(filteredNavData).map((category) => {
            return (
              <React.Fragment key={category}>
                <ListItem button onClick={() => handleClick(category)}>
                  <ListItemText primary={category.toUpperCase()} />
                  {isNavOpen[category] ? (
                    <ExpandLess />
                  ) : !filteredActive ? (
                    <ExpandMore />
                  ) : null}
                </ListItem>
                <Collapse
                  in={isNavOpen[category] || filteredActive}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {filteredNavData[category] &&
                      filteredNavData[category].map((listItem) => {
                        if (listItem.TITLE) {
                          return (
                            <AttributeListItem
                              key={listItem.TITLE}
                              listItem={listItem}
                              criteriaAttributes={criteriaAttributes}
                            />
                          );
                        }
                      })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      )}
      {!filteredNavData && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress />{" "}
        </div>
      )}
    </React.Fragment>
  );
};

export default LeftPanel;
