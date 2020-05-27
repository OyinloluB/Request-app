import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ViewContact from "../Modals/ViewContact";
import EditContact from "../Modals/EditContact";

const columns = [
  { id: "firstname", label: "First Name", maxWidth: 100 },
  { id: "lastname", label: "Last Name", maxWidth: 100 },
];

const actionColumns = [
  { id: "view", label: "View", maxWidth: 100 },
  { id: "edit", label: "Edit", maxWidth: 100 },
  { id: "delete", label: "Delete", maxWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ContactTable({
  employees,
  deleteEmployee,
  setEmployees,
  states,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showSingleContact, setShowSingleContact] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ViewContact
        showSingleContact={showSingleContact}
        setShowSingleContact={setShowSingleContact}
        employee={currentEmployee}
      />
      {showEditContact ? (
        <EditContact
          show={showEditContact}
          setShow={setShowEditContact}
          employees={employees}
          setEmployees={setEmployees}
          states={states}
          currentEmployeeIndex={employees.findIndex(
            (employee) => employee.id === currentEmployee.id
          )}
        />
      ) : null}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {[...columns, ...actionColumns].map((column) => (
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
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => {
                  return (
                    <TableRow hover role="checkbox" key={employee.id}>
                      {columns.map((column) => {
                        const value = employee[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <i
                          className="fas fa-info"
                          onClick={() => {
                            setCurrentEmployee(employee);
                            setShowSingleContact(true);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        ></i>
                      </TableCell>
                      <TableCell>
                        <i
                          className="fas fa-user-edit"
                          onClick={() => {
                            setCurrentEmployee(employee);
                            setShowEditContact(true);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        ></i>
                      </TableCell>
                      <TableCell>
                        <i
                          className="far fa-trash-alt"
                          onClick={() => deleteEmployee(employee.id)}
                          style={{
                            cursor: "pointer",
                          }}
                        ></i>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
