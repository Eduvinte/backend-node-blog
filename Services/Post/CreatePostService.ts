import prisma from "../../db/db"
async function CreatePostService(title: string, authorId:any, picture:any, content:string){
    try {
        
        await prisma.post.create({
            data: {
                title: title,
                authorId: authorId,
                picture: picture,
                content: content
            }
        })
        
    } catch (error) {
        console.error('Error al crear post', error)
        return { error: 'Intern error for creation the post.' }
    }
}
 export default CreatePostService