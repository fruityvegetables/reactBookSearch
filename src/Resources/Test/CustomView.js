import React from 'react';
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { capitalize, convertTime } from "../../util/utils";

const CustomView = ({ data }) => {
    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry, index) => {
                return (
                  entry[0] !== "id" && (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <b>{capitalize(entry[0])}</b>

                    {entry[0] === 'issuers' && <Tooltip title="Add Issuer">
                        <IconButton aria-label="Add Issuer">
                        <AddIcon/>
                        </IconButton>
                    </Tooltip>}

                      </TableCell>

                      <TableCell align="right">
                        {Array.isArray(entry[1]) &&
                         entry[1].length !== 0 &&
                        <div>
                            {entry[1].map(items => {
                               return (
                                   <div>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{items.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Funding Source Type</TableCell>
                                        <TableCell>{capitalize(items.fundingSourceType.name)}</TableCell>
                                    </TableRow>
                                    </div>
                                )
                            })}
                        </div>
                        }
                        {entry[1] === true && "Yes"}
                        {entry[1] === false && "No"}
                        {entry[0] === "createdAt" && convertTime(entry[1])}
                        {entry[0] === "updatedAt" && convertTime(entry[1])}
                        {entry[0] !== "createdAt" &&
                          !Array.isArray(entry[1]) &&
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
    )
}

export default CustomView;
