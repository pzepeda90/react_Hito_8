import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import useInput from '../../Hooks/useInput';
import Swal from 'sweetalert2';
import './register_Page.css';

export default function Register() {
    const { register } = useContext(UserContext);
    const navigate = useNavigate();
    const email = useInput('');
    const password = useInput('');
    const confirmPassword = useInput('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            if (email.isEmpty || password.isEmpty || confirmPassword.isEmpty) {
                setError('Todos los campos son obligatorios');
                return;
            }

            if (password.value.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return;
            }

            if (password.value !== confirmPassword.value) {
                setError('Las contraseñas no coinciden');
                return;
            }


            Swal.fire({
                title: 'Registrando...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });


            const result = await register(email.value, password.value);

            // Cerrar loading
            Swal.close();

            if (result.success) {

                await Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'Tu cuenta ha sido creada correctamente',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                navigate('/');
            } else {

                Swal.fire({
                    title: 'Error',
                    text: result.error || 'Error en el registro',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
                setError(result.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Error de conexión con el servidor',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="text-center mb-4">Registro</h2>
                
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form className='formulario' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label>E-mail</label>
                        <input 
                            type="email" 
                            name='email'
                            className='form__control' 
                            value={email.value}
                            onChange={email.onChange}
                            required
                        />
                    </div>

                    <div className='form__group'>
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            name='password'
                            className='form__control' 
                            value={password.value}
                            onChange={password.onChange}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className='form__group'>
                        <label>Confirmar contraseña</label>
                        <input 
                            type="password" 
                            name='confirmPassword'
                            className='form__control' 
                            value={confirmPassword.value}
                            onChange={confirmPassword.onChange}
                            required
                            minLength={6}
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        className='btn btn-primary w-100'
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
}
