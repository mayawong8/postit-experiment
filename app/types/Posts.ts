export type PostType = {
    title: string
    id: string
    createdAt: string
    user: {
        name: string
        image: String
    }
    Comment?: {
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}