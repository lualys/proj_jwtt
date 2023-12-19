// DeleteDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const DeleteDialog = ({ open, handleDeleteCancel, handleDeleteConfirm }) => (
    <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Tem certeza de que deseja excluir este aluno?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancelar</Button>
            <Button onClick={handleDeleteConfirm}>Excluir</Button>
        </DialogActions>
    </Dialog>
);

export default DeleteDialog
