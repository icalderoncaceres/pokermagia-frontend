
import { useState } from 'react';
import { login } from '../services/users/UserService';

function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [failed, setFailed] = useState<boolean>(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await login({email, password});
            if (response.status !== 200 || !response.data) {
                setFailed(true);
                return;
            }
            setFailed(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user.email || '')
            window.location.reload();
        } catch (error) {
            setFailed(true);
        }
    }

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    let alert: any;
    if (failed) {
        alert = <div className="alert alert-danger text-center" role="alert">Acceso denegado!</div>
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Bienvenido</h1>
                                        </div>
                                        <form className="user" onSubmit = {e => handleSubmit(e)}>
                                            <div className="form-group">
                                                <input type="email" value={email} onChange = {e => handleChangeEmail(e)}
                                                    className="form-control form-control-user"
                                                    id="input-email" aria-describedby="emailHelp"
                                                    placeholder="Ingrese el email.." />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={password} onChange = {e => handleChangePassword(e)} 
                                                    className="form-control form-control-user"
                                                    id="input-password" placeholder="Contraseña" />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Ingresar
                                            </button>
                                        </form>
                                    </div>
                                    {alert}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;