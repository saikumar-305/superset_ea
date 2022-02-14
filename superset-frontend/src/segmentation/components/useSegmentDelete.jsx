import React, { useState } from "react";
import { Dialog, DialogTitle, Button, DialogActions } from "@material-ui/core";

/**
 * Custom hook for segment deletion
 */
const useSegmentDelete = (onSubmit) => {
  const [deleteDialogOpen, setDialogOpen] = useState(false);
  // const [handleDeleteSegment, setHandleDeleteSegment] = useState(() => {});
  const handleDeleteDialogClose = () => {
    setDialogOpen(false);
  };

  const SegmentationDelete = () => {
    return (
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>
          {"Are you sure you want to delete the segment?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            No
          </Button>
          <Button onClick={onSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return [setDialogOpen, SegmentationDelete];
};

export default useSegmentDelete;
