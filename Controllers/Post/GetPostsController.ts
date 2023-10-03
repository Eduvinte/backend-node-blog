import { Request, Response, response } from 'express'
import GetPostsService from '../../Services/Post/GetPostService'
async function GetPostController(req: Request, res:Response){
    try {
        const authorId  = parseInt(req.params.authorId)
        const response = await GetPostsService(authorId)
        res.json(response)
    } catch (error) {
        res.status(500).send('Error al obetener los posts')
    }
}

export default GetPostController