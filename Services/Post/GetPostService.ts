import prisma from "../../db/db"
async function GetPostsService(authorId: number){
    try {
       const response = await prisma.post.findMany({
            where: {
                authorId: authorId
            }
        })
        return response
    } catch (error) {
        return { error: 'Error al obtener los posts' }
    }
}
export default GetPostsService