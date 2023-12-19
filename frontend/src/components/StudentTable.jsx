// StudentTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

const StudentTable = ({ studentData, courses, handleEdit, handleDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Curso</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Apagar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {studentData.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.nome}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{courses.find((course) => course.id === student.cur_id).curso}</TableCell>
            <TableCell>
              <Button onClick={() => handleEdit(student.id)}>Editar</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(student.id)}>Apagar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StudentTable;