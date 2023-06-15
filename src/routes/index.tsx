import page, { redirectTo } from './generator'
import AppLayout from '@/layout'
import { RouteObject } from 'react-router-dom'

const publicRoutes: RouteObject[] = [
	{ path: "/login", element: page("Login") },
	{ path: "*", element: redirectTo("/login", true) }
]

const privateRoutes: RouteObject[] = [
	{ path: "/products", element: page("Products", "Products", AppLayout) },
	{ path: "/search", element: page("Search", "Search", AppLayout) },
	{ path: "/login", element: redirectTo("/products", true) },
	{ path: "/", element: redirectTo("/products", true) },
	{ path: "*", element: page("404") }
]

export { publicRoutes, privateRoutes }