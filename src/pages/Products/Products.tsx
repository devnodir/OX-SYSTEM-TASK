import { Table } from 'antd'
import React, { Fragment, useMemo, useState } from 'react'
import useApi from '@/hooks/useApi'
import { PRODUCTS } from '@/utils/variables'
import { mapTableData } from '@/utils/methods'
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import useParseData from '@/hooks/useParseData'

const Products: React.FC = () => {

	const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))
	const [size, setSize] = useQueryParam("size", withDefault(NumberParam, 20))

	const { data, isLoading, isFetching } = useApi(PRODUCTS, {}, { page, size })

	const { tableData, totalPage } = useParseData<any>(data)

	const columns = [
		{
			title: 'NO',
			dataIndex: 'no',
		},
		{
			title: 'Name',
			dataIndex: 'productName',
		},
		{
			title: 'Product',
			dataIndex: 'product',
		},
		{
			title: 'Unit',
			dataIndex: 'unit',
		},
		{
			title: 'Supplier',
			dataIndex: 'supplier',
		},
		{
			title: 'Barcode',
			dataIndex: 'barcode',
		},
	];

	return (
		<Fragment>
			<div className='page'>
				<Table
					columns={columns}
					dataSource={mapTableData(tableData, page, size)}
					loading={isLoading || isFetching}
					scroll={{ x: "max-content" }}
					pagination={{
						onChange: (page, size) => {
							setPage(page)
							setSize(size)
						},
						current: page,
						pageSize: size,
						total: totalPage
					}}
				/>
			</div>
		</Fragment>
	)
}

export default Products