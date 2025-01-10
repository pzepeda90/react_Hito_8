// Login.jsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import './login.css'

export const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        try {

            Swal.fire({
                title: 'Iniciando sesión...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            const result = await login(email, password);
            

            Swal.close();
            
            if (result.success) {

                await Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Has iniciado sesión correctamente',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                navigate('/');
            } else {

                Swal.fire({
                    title: 'Error',
                    text: result.error || 'Credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo',
                    confirmButtonColor: '#d33'
                });
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (error) {

            Swal.fire({
                title: 'Error',
                text: 'Error de conexión con el servidor',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#d33'
            });
            console.error('Login - Error inesperado:', error);
            setError('Error de conexión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form__control"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            className="form__control"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;