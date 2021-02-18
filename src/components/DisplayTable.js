import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, 
  TableBody, TableCell,TableContainer, 
  TableHead, TablePagination, TableRow, 
  Modal } from '@material-ui/core';
import ChangeStatus from './ChangeStatusModal'

const columns = [
  { id: 'value', label: 'Habit', minWidth: 170 },
  { id: 'endDate', label: 'Deadline', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 30
  },
  container: {
    maxHeight: 330,
  },
});

export default function DisplayTable({data, updateStatus}) {
  const [show, setShow] = useState(false);
  const [rowClick, setRowClick] = useState({});
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleTableClick = (event, row) => {
    setShow(true);
    setRowClick(row);
  }
  const handleClose = () => {
    setShow(false);
  }
  const changeStatus = (value) => {
    if(value === 'Complete') {
      updateStatus(value, rowClick);
    }
    handleClose();
  }
  let rows = data;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{cursor: 'pointer'}} onClick={(e) => {handleTableClick(e, row)}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                          key={column.id}
                          align={column.align} 
                          style={{ color: column.id === 'status' ? '#ff5722' : 'rgba(0, 0, 0, 0.87)'}}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <ChangeStatus data={["Incomplete", "Complete"]} handleSubmit={changeStatus}/>
        </Modal>
    </React.Fragment>
  );
}