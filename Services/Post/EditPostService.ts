import prisma from "../../db/db"
async function EditPostService(title: string, picture:string | undefined, content:string, parsePostId:number){
    try {

        if(!title || !content){
            const postFound = await prisma.post.findFirst({
                where: {
                    id: parsePostId
                }
            })

            if(!title){
                await prisma.post.update({
                    where: {
                        id: parsePostId
                    },
                    data: {
                        title: postFound?.title
                    }
                })
            }else {
                await prisma.post.update({
                    where: {
                        id: parsePostId
                    },
                    data: {
                        title: title,                 
                    }
                })
            }

            if(!content){
                await prisma.post.update({
                    where: {
                        id: parsePostId
                    },
                    data: {
                        content: postFound?.content
                    }
                })
            }else {
                await prisma.post.update({
                    where: {
                        id: parsePostId
                    },
                    data: {                
                        content: content
                    }
                })
            }


        }else {
            await prisma.post.update({
                where: {
                    id: parsePostId
                },
                data: {
                    title: title,
                    picture: picture,
                    content: content
                }
            })
        }
        

    } catch (error) {
        console.error(error)
        return { error: 'Error intern on edit this post' }
}
}
export default EditPostService