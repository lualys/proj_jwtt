// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alunos from '../pages/Alunos';
import Cursos from '../pages/Cursos';
import Register from '../pages/Cadastro';
import Login from '../pages/Login';
import ProtectedRoute from '../services/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                    <Route path="/alunos" element={<ProtectedRoute><Alunos/></ProtectedRoute>} />
                    <Route path="/cursos" element={<ProtectedRoute><Cursos/></ProtectedRoute>} />
                    <Route path="/register" element={<Register/>} /> 
                    <Route path="" element={<Login/>} />
            </Routes>
        </Router>
    );
};

export default App;