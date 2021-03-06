import React, {useState, useEffect} from 'react';
import { Paper, Table, 
  TableBody, TableCell,TableContainer, 
  TableHead, TablePagination, TableRow, 
  Modal } from '@material-ui/core';
import ChangeStatus from './ChangeStatusModal';
import '../css/table.css';

const columns = [
  { id: 'value', label: 'Habit', minWidth: 170 },
  { id: 'endDate', label: 'Deadline', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
];

export default function DisplayTable({data, updateStatus, expiredResult}) {
  const [show, setShow] = useState(false);
  const [rowClick, setRowClick] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const checkEveryHour = () => {
    function itemExpiryCheck() {
      let end = data.filter((d, index) => {
        let parsedDate = new Date(d.endDate);
        return parsedDate < Date.now() ? true : false;
      });
      if(end.length) {
        expiredResult(end);
      }
    }
    const interval = setInterval(itemExpiryCheck, 3600000); // Run the set Interval every 1 hour.
    return () => clearInterval(interval);
  }
  
  useEffect(checkEveryHour, []);

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
      <Paper className="paper">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="table-header">
              <TableRow className="table-header-row">
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className="table-row" onClick={(e) => {handleTableClick(e, row)}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                          key={column.id}
                          align={column.align} 
                          className={column.id === 'status' ? ' table-data-red' : 'table-data'}>
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