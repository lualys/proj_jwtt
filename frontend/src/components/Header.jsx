import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';



export default function Header() {
    const [cookies, , removeCookie] = useCookies(['jwt']);

    const handleLogout = () => {
        removeCookie('jwt', { path: '/' });
    };

    useEffect(() => {
        if (!cookies.jwt) {
            window.location.href = '/';
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
            <AppBar
                position="static"
                color="default"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Cadastro
                    </Typography>
                    <nav>
                        <Link variant="button" color="text.primary" href="/alunos" sx={{ my: 1, mx: 1.5 }}>
                            Alunos
                        </Link>
                        <Link variant="button" color="text.primary" href="/cursos" sx={{ my: 1, mx: 1.5 }}>
                            Cursos
                        </Link>
                    </nav>
                    <Button onClick={handleLogout} type='button' variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        SAIR
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}