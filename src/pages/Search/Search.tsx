import { Col, Input, Row, Table } from 'antd'
import React, { Fragment, } from 'react'
import useApi from '@/hooks/useApi'
import { PRODUCTS } from '@/utils/variables'
import { mapTableData } from '@/utils/methods'
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import useParseData from '@/hooks/useParseData'
import { SearchOutlined } from '@ant-design/icons'

const Search: React.FC = () => {

	const { data, isLoading, isFetching } = useApi(PRODUCTS)

	const [search, setSeach] = useQueryParam("search", withDefault(StringParam, ""))

	const { tableData } = useParseData<any>(data)

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

	const filter = (item: any) => {
		return item.productName?.toLowerCase().includes(search.toLowerCase())
	}

	const compare = (a: any, b: any) => {
		let fa = a.productName.toLowerCase(),
			fb = b.productName.toLowerCase(),
			fs = search.toLowerCase()
		return fa.indexOf(fs) - fb.indexOf(fs)
	}

	const searchTable = (arr: any[]) => {
		if (search) {
			return arr
				.filter(filter)
				.sort(compare)
		}
		return arr
	}

	return (
		<Fragment>
			<div className='page'>
				<div className="page-search">
					<Input
						placeholder="Search"
						size="large"
						prefix={<SearchOutlined />}
						value={search}
						onChange={e => setSeach(e.target.value)}
					/>
				</div>
				<Table
					columns={columns}
					dataSource={searchTable(mapTableData(tableData, 1, 1))}
					loading={isLoading || isFetching}
					scroll={{ x: "max-content" }}
					pagination={false}
				/>
			</div>
		</Fragment>
	)
}

export default Search