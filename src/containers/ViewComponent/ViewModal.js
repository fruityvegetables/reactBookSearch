import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { capitalize, convertTime } from "../../util/utils";

export class ViewDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: {
        minWidth: 650
      }
    };
  }

  render() {
    const { open, closeViewModal, dataToDisplay, templateCases, CustomViewComponent, extraData } = this.props;
    const data = Object.entries(dataToDisplay);

    if (templateCases.includes('custom-view')) {
      return (
        <Dialog
        open={open}
        onClose={closeViewModal}
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <CustomViewComponent
            dataToDisplay={dataToDisplay}
            closeModal={closeViewModal}
            extraData={extraData}
          />
        </Dialog>
      )
    } else {
    return (
      <Dialog
        open={open}
        onClose={closeViewModal}
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TableContainer component={Paper}>
          <Table className={this.state.table} aria-label="simple table">
            <TableHead>
              <TableRow className="gggg">
                <TableCell>Key</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry, index) => {
                return (
                  !Array.isArray(entry[1]) &&
                  entry[0] !== "id" && (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <b>{capitalize(entry[0])}</b>
                      </TableCell>

                      <TableCell align="right">
                        {entry[1] === true && "Yes"}
                        {entry[1] === false && "No"}
                        {entry[0] === "createdAt" && convertTime(entry[1])}
                        {entry[0] === "updatedAt" && convertTime(entry[1])}
                        {entry[0] !== "createdAt" &&
                          entry[0] !== "updatedAt" &&
                          entry[1] !== true &&
                          entry[1] !== false &&
                          entry[1]}
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button
            variant="contained"
            className="jr-btn jr-btn-lg bg-indigo lighten-1 text-white create-dialog mb-3"
            onClick={closeViewModal}
          >
            <span>Close</span>
          </Button>
        </DialogActions>
      </Dialog>
      );
    }
  }
}

export default ViewDialog;
