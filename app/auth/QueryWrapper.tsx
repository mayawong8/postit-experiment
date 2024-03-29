'use client'

import { QueryClient, QueryClientProvider } from "react-query"
import {ReactNode} from 'react'

import {Toaster} from 'react-hot-toast'

interface Props {
    children?: ReactNode
}
const queryClient = new QueryClient()

const QueryWrapper = ({children}: Props) => (
    <QueryClientProvider client={queryClient}>
        <Toaster/>
        {children}
    </QueryClientProvider>
)

export default QueryWrapper