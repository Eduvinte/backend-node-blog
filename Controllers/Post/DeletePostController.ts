import e, { Request, Response } from "express"
import DeletePostService from "../../Services/Post/DeletePostService"
function DeletePostController(req: Request, res: Response){
    try {
        const { postId } = req.params
        const parsePostId = parseInt(postId)
        DeletePostService(parsePostId)
        return res.json('Post deletado con éxito!')
    } catch (error) {
        console.error(error)
        res.status(500).send('Inter Error on delete this post')
    }
}

export default DeletePostController