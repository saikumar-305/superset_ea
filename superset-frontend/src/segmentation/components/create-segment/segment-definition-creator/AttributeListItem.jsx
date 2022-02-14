import React, { useContext } from 'react';
import { getDefinitionByAttributeName } from 'src/segmentation/utilities/segmentDefinitionUtils';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FilterContext } from 'src/segmentation/context/FilterContext';
import { makeStyles } from '@material-ui/core/styles';
// import { DragItemTypes } from "./DragItemTypes";
import { useDrag } from 'react-dnd';
import { Tooltip } from '@material-ui/core';

/* Hover color changed otherwise the drag image might not be
   uniform color if drag is started too quickly */
const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
    '&:hover': {
      backgroundColor: theme.palette.action.active,
      color: 'white',
    },
  },
}));

const AttributeListItem = ({ listItem, criteriaAttributes }) => {
  const classes = useStyles();
  const { addAttribute } = useContext(FilterContext);
  const attributeDef = getDefinitionByAttributeName(
    listItem.TITLE,
    criteriaAttributes,
  );

  const itemsToSend = {
    [listItem.TITLE]: {
      criteriaAttributes: null,
      itemDetails: listItem,
    },
  };

  const [{ isOver }, drag] = useDrag({
    type: 'list',
    // type inside item is for backward compatiblity with react-dnd 11 that we
    // are forced to use
    item: {
      id: listItem.TITLE,

      data:
        listItem.hasOwnProperty('SEGMENTTITLE') && listItem.hasOwnProperty('ID')
          ? itemsToSend
          : attributeDef,
      type: 'list',
    },
  });

  return (
    <>
      <Tooltip title="Drag">
        <ListItem button className={classes.nested}>
          <ListItemText ref={drag} primary={listItem.TITLE} />
        </ListItem>
      </Tooltip>
    </>
  );
};

export default AttributeListItem;
