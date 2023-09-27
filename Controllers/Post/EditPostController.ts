import { Request, Response } from "express"
import EditPostService from "../../Services/Post/EditPostService"
function EditPostController(req:Request, res:Response){
    try {
        const { title, content } = req.body
        const { postId } = req.params
        const parsePostId = parseInt(postId)
        const photo = req.file
        
        if(!photo){
            res.json('Foto no proporcionada.')
        }

        const picture = photo?.path

        EditPostService( title, picture, content, parsePostId )

        res.json('Post editado con éxito!')
    } catch (error) {
        console.error(error)
        res.status(500).send('Intern Error on edit this post.')
    }
}

export default EditPostController