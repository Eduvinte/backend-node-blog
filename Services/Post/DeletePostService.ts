import prisma from "../../db/db"

async function DeletePostService(parsePostId: number) {
    try {
        await prisma.post.delete({
            where: {
                id: parsePostId
           }
        })
    } catch (error) {
        console.error(error)
        return { error: 'Error al deletar este post' }
    }
}

export default DeletePostService