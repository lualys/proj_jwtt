import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import DeleteDialog from '../components/StudentDeleteDialog';


import { criarAluno, buscarAlunos, editarAluno, removerAluno, buscarCursos } from '../services/AuthService';
import { useCookies } from 'react-cookie';

const initialFormData = { id: null, nome: '', email: '', cur_id: '' };

export default function Students() {
    const [studentData, setStudentData] = useState([]);
    const [courses, setCourses] = useState([]);
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
            const newStudent = await criarAluno(formData, cookies.jwt);
            setStudentData([...studentData, newStudent]);
            toast.success('Aluno criado com sucesso!');
          } else {
            await editarAluno(formData.id, formData, cookies.jwt);
            const updatedStudents = studentData.map((student) =>
              student.id === formData.id ? formData : student
            );
            setStudentData(updatedStudents);
            toast.success('Aluno atualizado com sucesso!');
          }
          setFormData(initialFormData);
        } catch (error) {
          console.error('Erro ao criar/editar aluno:', error);
          toast.error('Erro ao criar/editar aluno. Tente novamente.');
        }
      };

    const handleEdit = (id) => {
        const studentToEdit = studentData.find((student) => student.id === id);
        setFormData({ ...studentToEdit });
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
          await removerAluno(deleteId, cookies.jwt);
          const updatedStudents = studentData.filter((student) => student.id !== deleteId);
          setStudentData(updatedStudents);
          setOpenDeleteDialog(false);
          toast.success('Aluno excluído com sucesso!');
        } catch (error) {
          // Handle error
          console.error('Erro ao excluir aluno:', error);
          toast.error('Erro ao excluir aluno. Tente novamente.');
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
        const fetchData = async () => {
            try {
                const students = await buscarAlunos(cookies.jwt);
                const availableCourses = await buscarCursos(cookies.jwt);

                setStudentData(students);
                setCourses(availableCourses);
            } catch (error) {
                // Handle error
                console.error('Erro ao buscar alunos/cursos:', error);
            }
        };

        if (!cookies.jwt) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } else {
            fetchData();
        }
    }, [cookies.jwt]);

    if (!cookies.jwt) {
        return (
            <>
                <p>Você não está logado</p>
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
                                <CardHeader title="Lista de Alunos" />
                                <CardContent>
                                    <StudentTable
                                        studentData={studentData}
                                        courses={courses}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={formData.id ? 'Editar Aluno' : 'Novo Aluno'} />
                                <CardContent>
                                    <StudentForm
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        handleCreate={handleCreate}
                                        handleCancel={handleCancel}
                                        courses={courses}
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
