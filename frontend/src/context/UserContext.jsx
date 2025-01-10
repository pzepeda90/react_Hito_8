// UserContext.jsx
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch {
                localStorage.removeItem('user');
                return null;
            }
        }
        return null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('user')));

    useEffect(() => {
        console.log('Estado de autenticación actualizado:', {
            user,
            isAuthenticated,
            localStorageUser: localStorage.getItem('user')
        });
    }, [user, isAuthenticated]);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (response.ok && data.token) {
                const userData = {
                    email,
                    token: data.token,
                    id: data.id
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true };
            }
            
            return { 
                success: false, 
                error: data.message || 'Error de autenticación' 
            };
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                error: 'Error de conexión al servidor' 
            };
        }
    };

    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                const userData = {
                    email,
                    token: data.token,
                    id: data.id
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true };
            }
            
            return { 
                success: false, 
                error: data.message || 'Error en el registro' 
            };
        } catch (error) {
            console.error('Error en registro:', error);
            return { 
                success: false, 
                error: 'Error de conexión al servidor' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        console.log('Logout completado - Estado actualizado:', {
            user: null,
            isAuthenticated: false
        });
    };

    const getToken = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                return userData.token;
            }
        } catch (error) {
            console.error('Error obteniendo token:', error);
        }
        return null;
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        getToken,
        register
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };