import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { EnhancedTableHead } from './EnhancedTableHead';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import CreateDialog from '../CreateComponent/Create';
import UpdateDialog from '../UpdateComponent/Update';
import { 
  openCreateModal,
  openCreatePage,
  closeAlert, getOneEntity, openUpdateModal,
  closeCreateModal, openUpdatePage,
  openUpdateModalStart, renderDeleteConfirmation,
  closeDeleteConfirmation, deleteResource, deleteResourceStart,
  getPaginatedData, getPaginatedDataStart,
  openViewModal,
  closeViewModal,
  getOneStart,
  getExtraData
} from '../../actions/Entities';
import { NoResourceFound } from '../../components/NoResourceFound';
import { UnexpectedError } from '../../components/NoResourceFound/UnexpectedError';
import { ConfirmDialog } from '../../components/Dialog/ConfirmDelete';
import ViewDialog from "../ViewComponent/ViewModal";
import { convertTime } from '../../util/utils';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
    const { paginatedData } = this.props;
    this.state = {
      order: "asc",
      orderBy: this.props.columnToOrderBy,
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: this.props.rowsPerPage,
      actionPurpose: "",
      checkedRows: [],
      countToDelete: "",
      rows: paginatedData,
      singleRow: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.paginatedData[0] !== prevState.rows[0]) {
      return { rows: [...nextProps.paginatedData] };
    }
    if (nextProps.paginatedData.length !== prevState.rows.length) {
      return { rows: [...nextProps.paginatedData] };
    } else return null;
  }

  componentDidMount() {
    const {
      getPaginatedDataStart: getStart,
      getPaginatedData: getData,
      baseEntityAPI,
      extraEntitiesToFetch,
      getExtraData
    } = this.props;
    const { page, rowsPerPage } = this.state;

    getStart();
    getData(baseEntityAPI, page, rowsPerPage);
    getExtraData(extraEntitiesToFetch);
  }

  componentDidUpdate(prevProps) {
    const { openUpdateModal, entity, openViewModal } = this.props;
    const { actionPurpose } = this.state;

    if (entity !== prevProps.entity && actionPurpose === 'update') {
      openUpdateModal(entity);
    }
    if (entity !== prevProps.entity && actionPurpose === 'view') {
      openViewModal(entity);
    }
  }

  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === property && order === "asc";
    this.setState({
      order: isAsc ? "desc" : "asc",
      setOrderBy: property
    });
  };

  handleSelectAllClick = event => {
    const {
      paginatedData: rows,
      tableKey,
      uniqueRoleIdentifier: id
    } = this.props;

    if (event.target.checked) {
      const newSelecteds = rows.map(row => row[tableKey]);
      const newCheckedRows = rows.map(row => row[id]);
      this.setState({
        selected: newSelecteds,
        checkedRows: newCheckedRows
      });
      return;
    }
    this.setState({ selected: [] });
  };

  handleCheckClick = (event, tableKey, id) => {
    const { selected, checkedRows } = this.state;
    const selectedIndex = selected.indexOf(tableKey);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, tableKey);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    const newCheckedRows = checkedRows.concat([id]);

    this.setState(prevState => ({
      selected: newSelected,
      checkedRows: newCheckedRows
    }));
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    const {
      getPaginatedDataStart: getStart,
      getPaginatedData: getData,
      baseEntityAPI
    } = this.props;
    const { rowsPerPage } = this.state;
    getStart();
    getData(baseEntityAPI, newPage, rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    const {
      getPaginatedDataStart: getStart,
      getPaginatedData: getData,
      baseEntityAPI
    } = this.props;
    const newRowsPerPage = parseInt(event.target.value, 10);
    this.setState(prevState => ({
      rowsPerPage: newRowsPerPage,
      page: 0
    }));
    const page = 0;
    getStart();
    getData(baseEntityAPI, page, newRowsPerPage);
  };

  openCreateDialog = () => {
    const { openCreateModal } = this.props;
    this.setState({ actionPurpose: "create" });
    openCreateModal();
  };

  openCreateScreen = () => {
    const { openCreatePage } = this.props;
    this.setState({ actionPurpose: "create" });
    const {
      fieldsToCreate,
      actionPurpose,
      baseEntityAPI,
      NewPageFormComponent
    } = this.props;
    const otherData = {
      fields: fieldsToCreate,
      actionPurpose: actionPurpose,
      baseEntityAPI: baseEntityAPI,
      newPageFormComponent: NewPageFormComponent
    };

    openCreatePage(otherData);

    this.props.history.push("/app/create");
  };

  openViewDialog = id => {
    const { baseEntityAPI, getOneStart, getOneEntity } = this.props;
    this.setState({ actionPurpose: "view" });
    getOneStart();
    getOneEntity(id, baseEntityAPI)
  };

  closeAlert = () => {
    const { closeAlert } = this.props;
    closeAlert();
  };

  openUpdateDialog = object => {
    const {
      getOneEntity: getOne,
      openUpdateModalStart: updateStart,
      baseEntityAPI
    } = this.props;
    this.setState({ actionPurpose: "update" });
    updateStart();
    getOne(object.id, baseEntityAPI);
  };

  closeCreateDialog = () => {
    const { closeCreateModal: closeCreate } = this.props;
    closeCreate();
  };

  closeViewDialog = () => {
    const { closeViewModal: closeView } = this.props;
    closeView();
  };

  renderDeleteConfirmation = () => {
    const { checkedRows } = this.state;
    const { renderDeleteConfirmation: renderConfirm } = this.props;
    const rowCount = checkedRows.length;
    this.setState({ countToDelete: rowCount });
    renderConfirm();
  };

  closeDeleteConfirmation = () => {
    const { closeDeleteConfirmation: closeConfirm } = this.props;
    closeConfirm();
  };

  handleDelete = () => {
    const { checkedRows } = this.state;
    const { deleteResource, deleteResourceStart, baseEntityAPI } = this.props;

    deleteResourceStart();
    deleteResource(checkedRows, baseEntityAPI);
    this.setState({ selected: [] });
  };

  handleFirstPageButtonClick = event => {
    this.handleChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    const { page } = this.state;
    this.handleChangePage(event, page - 1);
  };

  handleNextButtonClick = event => {
    const { page } = this.state;
    this.handleChangePage(event, page + 1);
  };

  handleLastPageButtonClick = event => {
    const { rowsPerPage } = this.state;
    const { paginatedDataCount: count } = this.props;
    this.handleChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  };

  TablePaginationActions = () => {
    const classes = useStyles1();
    const theme = useTheme();
    const { page, rowsPerPage } = this.state;
    const { paginatedDataCount: count } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  };

  renderTableContent = (isGetResourceFailed, isEntityListEmpty) => {
    const {
      tableKey, fields, fieldsToUpdate,
      tableHeading, ispageDataLoading,
      isModalLoading, uniqueRoleIdentifier: id,
    } = this.props;
    const { orderBy, order, selected, dense, rows } = this.state;
    const isSelected = tableKey => selected.indexOf(tableKey) !== -1; 

    if (isGetResourceFailed) {
      return <UnexpectedError />
    }
    else if (isEntityListEmpty) {
      return (<NoResourceFound resourceName={tableHeading} />)
    } else {
      return  (
        <Table
          className="{classes.table}"
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes="{classes}"
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={rows.length}
            fields={fields}
          />
          <TableBody>
            {isModalLoading && (
              <div className="loader-view update-loader">
                <CircularProgress size={40} />
              </div>
            )}

            {ispageDataLoading ? (
              <div className="loader-view paginated-data-loader">
                <CircularProgress size={14} />
              </div>
            ) : (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[tableKey]);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row[id]}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={event =>
                          this.handleCheckClick(
                            event,
                            row[tableKey],
                            row[id]
                          )
                        }
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row[tableKey]}
                    </TableCell>
                    {fields.map(field => {
                      if (field.id !== tableKey) {
                        if(field.type == 'date') {
                          return (
                            <TableCell key={field[id]} align="right">
                              {convertTime(row[field.id])}
                            </TableCell>
                          );
                        } else {
                        return (
                          <TableCell key={field[id]} align="right">
                            {row[field.id]}
                          </TableCell>
                          );
                        }
                      }
                    })}
                    <TableCell align="left">
                      <span>
                        <i
                          className="zmdi zmdi-eye tableIcons"
                          onClick={() => this.openViewDialog(row["id"])}
                        ></i>
                        {fieldsToUpdate && <i
                          className="zmdi zmdi-edit tableIcons"
                          onClick={() => this.openUpdateDialog(row)}
                        ></i>}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      )
    }
  }

  render() {
    const {
      baseEntityAPI,
      paginatedDataCount,
      tableHeading,
      isCreateModalOpen, fieldsToCreate, fieldsToUpdate,
      isSuccess, entity, isUpdateModalOpen, isEntityListEmpty,
      isGetResourceFailed, autoFields,
      isDeleteConfirmOpen, isDeleteLoading, isDeleteSuccessful,
      isViewModalOpen, FormComponent, templateCases, fieldRules,
      UpdateFormComponent, CustomViewComponent, extraData,
      extraEntitiesToFetch
    } = this.props;
    const { selected, rowsPerPage, page, actionPurpose, countToDelete } = this.state;

    return (
      <div className="{classes.root}">
        {isSuccess && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.closeAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Success
          </Alert>
        )}

        {isDeleteSuccessful && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.closeAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Success
          </Alert>
        )}

        <ConfirmDialog
          open={isDeleteConfirmOpen}
          closeMethod={this.closeDeleteConfirmation}
          countToDelete={countToDelete}
          handleDelete={this.handleDelete}
          isDeleteLoading={isDeleteLoading}
        />


          <CreateDialog
            open={isCreateModalOpen}
            closeCreateModal={this.closeCreateDialog}
            fields={fieldsToCreate}
            tableHeading={tableHeading}
            actionPurpose={actionPurpose}
            baseEntityAPI={baseEntityAPI}
            FormComponent={FormComponent}
            templateCases={templateCases}
            fieldRules={fieldRules}
            extraData={extraData}
            extraEntitiesToFetch={extraEntitiesToFetch}
          />
          
          {fieldsToUpdate && <UpdateDialog
            open={isUpdateModalOpen}
            closeCreateModal={this.closeCreateDialog}
            fields={fieldsToUpdate}
            autoFields={autoFields}
            tableHeading={tableHeading}
            dataToUpdate={entity}
            actionPurpose={actionPurpose}
            baseEntityAPI={baseEntityAPI}
            templateCases={templateCases}
            fieldRules={fieldRules}
            FormComponent={UpdateFormComponent}
            extraData={extraData}
            extraEntitiesToFetch={extraEntitiesToFetch}
          />}

        <ViewDialog
          open={isViewModalOpen}
          closeViewModal={this.closeViewDialog}
          dataToDisplay={entity}
          templateCases={templateCases}
          CustomViewComponent={CustomViewComponent}
          extraData={extraData}
        />

        <Paper className="{classes.paper}">
          <EnhancedTableToolbar
            deleteMethod={this.renderDeleteConfirmation}
            openCreateModal={
              templateCases.includes("new-page-form")
                ? this.openCreateScreen
                : this.openCreateDialog
            }
            tableHeading={tableHeading}
            numSelected={selected.length}
            isGetResourceFailed={isGetResourceFailed}
          />
          <TableContainer>
            {this.renderTableContent(isGetResourceFailed, isEntityListEmpty)}
          </TableContainer>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: -1 }
                ]}
                colSpan={3}
                count={paginatedDataCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={this.TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  openCreateModal,
  openCreatePage,
  openUpdateModal,
  openUpdatePage,
  openViewModal,
  closeCreateModal,
  closeViewModal,
  closeAlert,
  getOneEntity,
  openUpdateModalStart,
  renderDeleteConfirmation,
  closeDeleteConfirmation,
  deleteResource,
  deleteResourceStart,
  getPaginatedData,
  getPaginatedDataStart,
  getOneStart,
  getOneEntity,
  getExtraData
};

const mapStateToProps = ({ Entities }) => {
  return {
    isCreateModalOpen: Entities.isCreateModalOpen,
    isUpdateModalOpen: Entities.isUpdateModalOpen,
    isViewModalOpen: Entities.isViewModalOpen,
    isSuccess: Entities.isSuccess,
    entity: Entities.entity,
    isDataFetched: Entities.isDataFetched,
    isModalLoading: Entities.isModalLoading,
    isEntityListEmpty: Entities.isEntityListEmpty,
    isGetResourceFailed: Entities.isGetResourceFailed,
    isDeleteConfirmOpen: Entities.isDeleteConfirmOpen,
    isDeleteLoading: Entities.isDeleteLoading,
    isDeleteSuccessful: Entities.isDeleteSuccessful,
    paginatedData: Entities.paginatedData,
    paginatedDataCount: Entities.paginatedDataCount,
    ispageDataLoading: Entities.ispageDataLoading,
    extraData: Entities.extraData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EnhancedTable));
