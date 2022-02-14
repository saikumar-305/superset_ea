import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/***************************
 * Nov 5, 21: 
 * Sanjay: Created new component
 *  
 **************************/

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
  media: {
    width: "70%"
  },
  action : {
    justifyContent: "center"
  }
});

const DEFAULT_IMAGE_HEIGHT = 160; 

const ReportDashboardItem = ({
  numItemsPerRow, //optional, default auto
  imageHeight, //optiona, default DEFAULT_IMAGE_HEIGHT above
  imageSrcBase64,
  reportName,
  handleClick,
  clickData, // to pass back to handleClick to identify it
}) => {
  const classes = useStyles();
  const [hoverEffect, setHoverEffect] = useState(false);

  const doOnClick = () => {
    handleClick(clickData);
  };

  const xsValue = numItemsPerRow ? 12 / numItemsPerRow : "auto";

  return (
    <>
      <Grid item xs={xsValue} align="center">
        <Card 
          elevation={3}
          className={classes.root}
          classes={{ root: hoverEffect ? classes.cardHovered : "" }}
          onMouseOver={() => setHoverEffect(true)}
          onMouseOut={() => setHoverEffect(false)}
          onClick={doOnClick}
          raised={hoverEffect.raised}
          zdepth={hoverEffect.shadow}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              src={`data:image/png;base64, ${imageSrcBase64}`}
              height={imageHeight ? imageHeight : DEFAULT_IMAGE_HEIGHT}
              alt={reportName}
            />

            <CardActions className={classes.action} >
              {reportName}
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ReportDashboardItem;
