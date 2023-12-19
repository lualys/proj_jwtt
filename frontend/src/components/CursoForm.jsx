// CursoForm.js
import React from 'react';
import { TextField, Button } from '@mui/material';

const CursoForm = ({ formData, handleInputChange, handleCreate, handleCancel }) => (
    <form>
        <TextField
            fullWidth
            label="Nome do Curso"
            name="curso"
            value={formData.curso}
            onChange={handleInputChange}
        />
        <Button onClick={handleCreate}>Criar</Button>
        <Button onClick={handleCancel}>Cancelar</Button>
    </form>
);

export default CursoForm