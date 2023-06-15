import type { MenuProps } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		label: "Products",
		key: "/products",
		icon: <ShoppingCartOutlined />
	},
	{
		label: "Search",
		key: "/search",
		icon: <SearchOutlined />
	},
];

const linkedItems: MenuItem[] = items.map((el: any) => {
	return {
		...el,
		label: <Fragment>{el.label} <NavLink to={el.key} /></Fragment>
	}
})

export default linkedItems