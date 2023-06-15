import { Spin } from 'antd'
import React from 'react'

const ScreenLoader: React.FC = () => {
	return (
		<div className='screen-loader'>
			<Spin />
		</div>
	)
}

export default ScreenLoader