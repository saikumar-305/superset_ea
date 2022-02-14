import React, { useEffect, useState, useContext } from 'react';
import LeftPanel from './LeftPanel';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SegmentHeader from '../segmentHeader';
import SegmentDefinitionCreator from './segment-definition-creator/SegmentDefinitionCreator';
import { FilterContext } from '../../context/FilterContext';
import SaveSegment from './SaveSegment';
import { getSingleSegment } from '../../utilities/segmentationOperations';
import { getCriteriaAttribute } from '../../utilities/createSegmentOperations';
import SegmentationPanel from '../segmentation-right-panel/SegmentationPanel';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
}));

const CreateNewSegment = ({ match }) => {
  const history = useHistory();
  if (match.url.includes('/segmentation/edit/') && !match.params.segmentID) {
    history.push(`/segmentation`);
  }
  const classes = useStyles();
  const {
    setSegment,
    isOperatorsLoaded,
    allCities,
    allStates,
    allZips,
    modifySegmentDetails,
  } = useContext(FilterContext);

  const [editMode, setEditMode] = useState(match.url.includes('/edit/'));
  console.log({ match, editMode });
  const [segmentId, setSegmentId] = useState(null);
  const [fetchingSegment, setfetchingSegment] = useState(null);

  const [segmentWhereClause, setSegmentWhereClause] = useState();
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

  const reloadRightPanel = whereClause => {
    setSegmentWhereClause(whereClause);
  };

  async function setSegmentInEdit() {
    setfetchingSegment(true);
    try {
      const response = await getSingleSegment(match.params.segmentID);
      const { data: criteriaAttribute } = await getCriteriaAttribute();

      const segment = response.data['JSN'][0];
      const whereClauses = JSON.parse(segment['whereClauseJson']);

      const whereClausesWithAttributes = whereClauses.map(whereClause => {
        let label = whereClause['title'];
        let attribute = criteriaAttribute[whereClause['title']];
        if (label === 'CITY') attribute = allCities;
        if (label === 'STATE') attribute = allStates;
        if (label.startsWith('ZIP')) {
          attribute = allZips;
        }

        return {
          attribute: {
            [whereClause['title']]: attribute,
          },
          whereClause,
          label: whereClause['title'],
        };
      });
      const segmentDetails = {
        SegmentTitle: segment['TITLE'],
        SegDesc: segment['DESCRIPTION'],
        AddTags: segment['TAG'],

        // null is returned from API. If it's store false
        IsDraft: Boolean(segment['ISDRAFT']),
        isSegEdit: true,
      };
      setSegment(segmentDetails, whereClausesWithAttributes);
    } catch (ex) {
      console.error(ex);
    } finally {
      setfetchingSegment(false);
    }
  }
  useEffect(() => {
    if (!editMode && match.url.includes('/create')) {
      modifySegmentDetails('', '', '');
    }
  }, []);

  useEffect(() => {
    if (editMode && isOperatorsLoaded) {
      setSegmentId(match.params.segmentID);
      setSegmentInEdit();
    }
  }, [match.params.segmentID, editMode, isOperatorsLoaded]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <LeftPanel />
        </Grid>
        {rightPanelCollapsed && (
          <Grid item xs={8}>
            <SegmentHeader disabled={false} segment={{}} />
            <SegmentDefinitionCreator
              fetchingSegment={fetchingSegment}
              reloadRightPanel={reloadRightPanel}
            />
          </Grid>
        )}
        <Grid item xs={rightPanelCollapsed ? 2 : 10}>
          <Paper className={classes.paper}>
            <SegmentationPanel
              key={segmentWhereClause}
              collapse={true}
              segmentWhereClause={segmentWhereClause}
              setCollapse={setRightPanelCollapsed}
            />
          </Paper>
        </Grid>
      </Grid>
      <SaveSegment match={match} />
    </React.Fragment>
  );
};
export default CreateNewSegment;
