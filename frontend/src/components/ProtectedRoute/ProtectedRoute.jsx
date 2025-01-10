// ProtectedRoute.jsx
import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useContext(UserContext)

    useEffect(() => {
        console.log('ProtectedRoute - Estado de autenticación:', {
            isAuthenticated,
            user,
            localStorage: localStorage.getItem('user')
        });
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        console.log('ProtectedRoute - Redirigiendo a login');
        return <Navigate to="/login" />
    }

    return children
}

export const PublicRoute = ({ children }) => {
    const { isAuthenticated, user } = useContext(UserContext)

    useEffect(() => {
        console.log('PublicRoute - Estado de autenticación:', {
            isAuthenticated,
            user,
            localStorage: localStorage.getItem('user')
        });
    }, [isAuthenticated, user]);

    if (isAuthenticated) {
        console.log('PublicRoute - Redirigiendo a home');
        return <Navigate to="/" />
    }

    return children
}