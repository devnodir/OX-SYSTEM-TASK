import { Button, Typography, message } from 'antd';
import React from 'react'
import TextField from '@/components/Form/TextField';
import { useForm } from 'react-hook-form';
import { LockOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import useApiMutation from '@/hooks/useApiMutation';
import { setLocalStorage } from '@/utils/localStorage';
import { LOGIN, USER_SUB_DOMAIN, USER_TOKEN } from '@/utils/variables';
import { setIsAuth } from '@/utils/dispatch';
import { useNavigate } from 'react-router-dom';

interface IFormData {
	_username: string
	_password: string
	_subdomain: string
}

const Login: React.FC = () => {

	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	const { control, handleSubmit } = useForm<IFormData>()

	const { mutate, isLoading } = useApiMutation(LOGIN)

	const submit = (data: IFormData) => {
		setLocalStorage(USER_SUB_DOMAIN, data._subdomain)
		const formData = new FormData()
		Object.entries(data).forEach(item => formData.append(item[0], item[1]))
		mutate(formData, {
			onSuccess: (res: any) => {
				setLocalStorage(USER_TOKEN, res.token)
				setIsAuth(true)
				navigate("/", { replace: true })
			},
			onError: err => {
				messageApi.error(err.message)
			}
		})
	}

	return (
		<div className='login'>
			{contextHolder}
			<div className='login-content'>
				<div className="login-content-logo">
					<Typography.Title level={3} type="success">OX SYSTEM TASK</Typography.Title>
				</div>
				<form onSubmit={handleSubmit(submit)} className="login-form">
					<TextField
						wrapperClass='login-form-item'
						label='Username'
						name='_username'
						control={control}
						addonBefore={<UserOutlined />}
						required
					/>
					<TextField
						wrapperClass='login-form-item'
						label='Subdomain'
						name='_subdomain'
						control={control}
						addonBefore={<GlobalOutlined />}
						required
					/>
					<TextField
						wrapperClass='login-form-item'
						label='Password'
						autoComplete="off"
						name='_password'
						isPassword
						control={control}
						addonBefore={<LockOutlined />}
						required
					/>
					<Button loading={isLoading} className='login-form-button' htmlType="submit" block size="large" type="primary" >Kirish</Button>
				</form>
			</div>
		</div>
	)
}

export default Login