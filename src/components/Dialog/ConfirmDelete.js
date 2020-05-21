import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

export const ConfirmDialog = ({ open, isDeleteLoading, closeMethod, handleDelete, countToDelete }) => {

  return (
        <Dialog
          open={open}
          onClose={closeMethod}
          aria-labelledby="alert-dialog-title" 
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {countToDelete} item{countToDelete == '1' ? '' : 's'}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isDeleteLoading && 
              <div className="loader-view delete-confirm-loader">
                <CircularProgress size={14} />
              </div>}
            <Button onClick={handleDelete} color="secondary" className="delete-yes">
              Yes, Sure
            </Button>
            <Button onClick={closeMethod} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
      </Dialog>
    )
}
