import { IChildren } from '@/types/helper'
import { setIsAuth } from '@/utils/dispatch'
import { getLocalStorage } from '@/utils/localStorage'
import { USER_TOKEN } from '@/utils/variables'
import { message } from 'antd'
import React, { Fragment, useEffect } from 'react'

interface Props {
	children: IChildren
}


const AuthProvider: React.FC<Props> = ({ children }) => {

	const token = getLocalStorage(USER_TOKEN)

	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (token) setIsAuth(true)
	}, [])

	return <Fragment>
		{contextHolder}
		{children}
	</Fragment>
}

export default AuthProvider