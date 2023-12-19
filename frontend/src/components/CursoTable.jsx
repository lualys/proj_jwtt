// CursoTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';


const CursoTable = ({ cursos, handleEdit, handleDelete }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome do Curso</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Apagar</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cursos.map((curso) => (
                    <TableRow key={curso.id}>
                        <TableCell>{curso.id}</TableCell>
                        <TableCell>{curso.curso}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleEdit(curso.id)}>Editar</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => handleDelete(curso.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default CursoTable;
