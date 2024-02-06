import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session){
        redirect('/api/auth/sigin')
    }
    return(
        <main>
            <h1 className="text-2xl font-bold">Welcome Back {session.user?.name}</h1>
        </main>
    )
}