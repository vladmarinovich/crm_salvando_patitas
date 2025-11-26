import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { supabase } from '@/core/lib/supabase';
import './Login.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <header className="login-header">
                    <h1 className="login-title">Bienvenido de nuevo</h1>
                    <p className="login-subtitle">Ingresa a tu cuenta para continuar</p>
                </header>

                <form className="login-form" onSubmit={handleLogin}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <div className="input-wrapper">
                            <UserIcon className="input-icon" />
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <LockClosedIcon className="input-icon" />
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <a href="#" className="forgot-link">
                        ¿Olvidaste tu contraseña?
                    </a>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Ingresar al Dashboard'}
                    </button>
                </form>

                <footer className="login-footer">
                    ¿No tienes una cuenta?
                    <a href="#" className="signup-link">Regístrate ahora</a>
                </footer>
            </div>
        </div>
    );
};
