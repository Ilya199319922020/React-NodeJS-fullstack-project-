import React, { useEffect } from 'react';
import s from './Login.module.css';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { login } from '../redux/authReducer';
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

	const initialValues = () => {
		return (
			{
				login: '',
				password: '',
			}
		);
	};

	const onSubmit = (values, onSubmitProps) => {
		const { login, password } = values;
		props.login(login, password);
		onSubmitProps.setSubmitting(false);
	};

	const validationSchema = () => Yup.object({
		login: Yup.string().required('Required'),
		password: Yup.string().required('Required'),
	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{formik => {
				return (
					<Form
						className={s.loginForm}
					>
						<div>
							<Field
								className={s.loginForm__login}
								type={'text'}
								name={'login'}
								component={'input'}
								placeholder={"Логин"}
							/>
							<ErrorMessage
								name='login'
							/>
						</div>
						<div>
							<Field
								className={s.loginForm__password}
								placeholder={"Пароль"}
								name={'password'}
								component={'input'}
								type={'password'}
							/>
							<ErrorMessage
								name='password'
							/>
						</div>

						<div>
							<button
								className={s.loginForm__button}
								type={'submit'}
								disabled={!formik.isValid || formik.isSubmitting}
							>
								<a>
									ВОЙТИ
								</a>
							</button>
						</div>
					</Form>)
			}
			}
		</Formik>
	);
};

const Login = (props) => {
	let navigate = useNavigate();
	useEffect(() => {
		if (props.isAuth) {
			return navigate(`/orders/${props.clientId}`);
		}
	}, [props.isAuth]);

	return (
		<div className={s.login}>
			<h1 className={s.login__header}>Добро пожаловать!</h1>
			<LoginForm
				{...props}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		clientId: state.auth.clientId,
		isAuth: state.auth.isAuth,
	};
};

export default connect(mapStateToProps, { login })(Login);



