
import 'assets/css/main/app.css'
import 'assets/css/pages/auth.css'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from 'features/auth/authApi';
import { useNavigate } from 'react-router';
import { setLoginUser } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { BsFillDiagram3Fill } from 'react-icons/bs';

export const AlertErrorLogin = ({ error }) => {
    const { errors } = error.data
    return (
        <ul className="list-group ">
            <li className="list-group-item list-group-item-danger" >
                <span className="input-label">{errors}</span>
            </li>
        </ul>
    )
}
const Login = ({ hasLabel, layout }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginUser, { data, isSuccess, isLoading, isError, error }] = useLoginUserMutation()

    const [formData, setFormData] = useState({
        email: 'hafed@gmail.com',
        password: '',
        remember: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(formData)
        // toast.success(`Logged in as ${formData.email}`, {
        //     theme: 'colored'
        // });
    };
    const handleFieldChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    console.log('render Login Component')
    useEffect(() => {
        if (isSuccess) {
            if (data) {
                dispatch(setLoginUser(data))
                navigate('/')
            }
        }
    })

    return (
        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-5 col-12">
                    <div id="auth-left">
                        <div class="auth-logo">
                            <h1 > <BsFillDiagram3Fill className='text-warning rounded-circle border border-2 p-2' size={80}/> Net-Auto</h1>
                        </div>

                        <h1 className="auth-title1">Log in.</h1>
                        {
                            (isError && error) && <AlertErrorLogin error={error} />
                        }
                        <Form onSubmit={handleSubmit} action="index.html">

                            <Form.Group className="mb-3">
                                {hasLabel && <Form.Label>Email address</Form.Label>}
                                <Form.Control
                                    className='form-control-xl'
                                    placeholder={!hasLabel ? 'Email address' : ''}
                                    value={formData.email}
                                    name="email"
                                    onChange={handleFieldChange}
                                    type="email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                {hasLabel && <Form.Label>Password</Form.Label>}
                                <Form.Control
                                    className='form-control-xl'
                                    placeholder={!hasLabel ? 'Password' : ''}
                                    value={formData.password}
                                    name="password"
                                    onChange={handleFieldChange}
                                    type="password"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="mt-3 w-100 btn-block btn-lg shadow-lg mt-5"
                                    disabled={!formData.email || !formData.password}
                                >
                                    {
                                        isLoading &&
                                        <div className={`spinner-grow  text-info`} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    Log in
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="col-lg-7 d-none d-lg-block">
                    <div id="auth-right">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login