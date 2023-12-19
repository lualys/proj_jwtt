import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CursoTable from '../components/CursoTable';
import CursoForm from '../components/CursoForm';
import DeleteDialog from '../components/CursoDeleteDialog';

import Header from '../components/Header';
import { useCookies } from 'react-cookie';

import { buscarCursos, criarCurso, editarCurso, removerCurso } from '../services/AuthService';


const initialFormData = { id: null, curso: '' };

export default function Pricing() {
    const [cursos, setCursos] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [cookies] = useCookies(['jwt']);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async () => {
        try {
          if (formData.id === null) {
            // Create new course
            const novoCurso = await criarCurso(formData, cookies.jwt);
            setCursos([...cursos, novoCurso]);
            toast.success('Curso criado com sucesso!');
          } else {
            // Update existing course
            await editarCurso(formData.id, formData, cookies.jwt);
            const updatedCursos = cursos.map((curso) =>
              curso.id === formData.id ? formData : curso
            );
            setCursos(updatedCursos);
            toast.success('Curso atualizado com sucesso!');
          }
          setFormData(initialFormData);
        } catch (error) {
          // Handle error
          console.error('Erro ao criar/editar curso:', error);
          toast.error('Erro ao criar/editar curso. Tente novamente.');
        }
      };

    const handleEdit = (id) => {
        const cursoToEdit = cursos.find((curso) => curso.id === id);
        setFormData({ ...cursoToEdit });
    };
    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
          await removerCurso(deleteId, cookies.jwt);
          const updatedCursos = cursos.filter((curso) => curso.id !== deleteId);
          setCursos(updatedCursos);
          setOpenDeleteDialog(false);
          toast.success('Curso excluído com sucesso!');
        } catch (error) {
          // Handle error
          console.error('Erro ao excluir curso:', error);
          toast.error('Erro ao excluir curso, pode ter aluno vinculado.  Tente novamente.');
        }
      };

    const handleDeleteCancel = () => {
        setDeleteId(null);
        setOpenDeleteDialog(false);
    };

    const handleCancel = () => {
        setFormData(initialFormData);
    };

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const cursos = await buscarCursos(cookies.jwt);
                setCursos(cursos);
            } catch (error) {
                // Handle error
                console.error('Erro ao buscar cursos:', error);
            }
        };

        if (!cookies.jwt) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } else {
            fetchCursos();
        }
    }, [cookies.jwt]);


    if (!cookies.jwt) {
        return (
            <>
                <p>Vc não tá logado</p>
            </>
        );
    } else {

        return (
            <>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <Header />

                <Container maxWidth="xl" component="main" sx={{ mt: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader title="Lista de Cursos" />
                                <CardContent>
                                    <CursoTable cursos={cursos} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={formData.id ? 'Editar Curso' : 'Novo Curso'} />
                                <CardContent>
                                    <CursoForm
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        handleCreate={handleCreate}
                                        handleCancel={handleCancel}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <DeleteDialog
                        open={openDeleteDialog}
                        handleDeleteCancel={handleDeleteCancel}
                        handleDeleteConfirm={handleDeleteConfirm}
                    />
                </Container>
                <ToastContainer />
            </>
        );
    }
}