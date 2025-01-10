// UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getToken = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                return userData.token;
            }
            return null;
        } catch (error) {
            console.error('Error al obtener token:', error);
            return null;
        }
    };

    const getProfile = async () => {
        const token = getToken();
        if (!token) return null;

        try {
            const response = await fetch('http://localhost:3000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener el perfil');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getToken();
            if (token) {
                const profileData = await getProfile();
                if (profileData) {
                    setUser(profileData);
                    setIsAuthenticated(true);
                }
            }
        };

        initializeAuth();
    }, []);

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

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        register,
        getToken,
        getProfile
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};