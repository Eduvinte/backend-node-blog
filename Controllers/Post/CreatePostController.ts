import { Request, Response} from  'express'
import CreatePostService from '../../Services/Post/CreatePostService'

function CreatePostController(req: Request, res: Response){
    try {
        const { title, content } = req.body
        const authorId = parseInt(req.params.authorId, 10)
        
        const picture:any = req.file

        if(!picture){
           return res.status(400).send('Error no provider the picture.')
        }

       CreatePostService(title, authorId, picture.path, content)
        
       res.json('Post creado con éxito!')
    } catch (error) {
       return res.status(500).send('Error interno al crear el post.')
    }
}

export default CreatePostController