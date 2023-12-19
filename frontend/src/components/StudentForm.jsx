// StudentForm.js
import React from 'react';
import { TextField, Select, MenuItem, Button } from '@mui/material';

const StudentForm = ({ formData, handleInputChange, handleCreate, handleCancel, courses }) => (
  <form>
    <TextField
      fullWidth
      label="Nome"
      name="nome"
      value={formData.nome}
      onChange={handleInputChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      sx={{ mb: 2 }}
    />
    <Select
      fullWidth
      label="Curso"
      name="cur_id"
      value={formData.cur_id}
      onChange={handleInputChange}
      sx={{ mb: 2 }}
    >
      <MenuItem disable>
        <em>Selecione um curso</em>
      </MenuItem>
      {courses.map((course) => (
        <MenuItem key={course.id} value={course.id}>
          {course.curso}
        </MenuItem>
      ))}
    </Select>
    <Button onClick={handleCreate} sx={{ mr: 2 }}>
      {formData.id ? 'Salvar' : 'Criar'}
    </Button>
    <Button onClick={handleCancel}>Cancelar</Button>
  </form>
);


export default StudentForm