import { Request, Response } from "express"
import EditUserService from "../../Services/User/EditUserService"
async function EditUserController(req: Request, res: Response) {
    try {
        const objectPhoto = req.file
        const picture: any = objectPhoto?.path
        const { email, name, password } = req.body
        const userId = parseInt(req.params.userId)

        const response = await EditUserService(email, name, password, picture, userId)
    
        if (response) {
            res.json(response.error)
        } else {
            res.json('Usuario editado con éxito.')
        }

    } catch (error) {
        console.error(error)
        res.status(500).send('Intern error on edit this email.')
    }
}

export default EditUserController