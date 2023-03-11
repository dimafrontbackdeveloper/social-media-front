import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import AuthProvider from '@/providers/AuthProvider'
import BurgerProvider from '@/providers/burger-provider/BurgerProvider'

import '@/assets/styles/globals.scss'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BurgerProvider>
					<Component {...pageProps} />
				</BurgerProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default MyApp
