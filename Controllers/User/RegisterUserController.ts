import { Request, Response } from "express"
import RegisterUserService from "../../Services/User/RegisterUserService"


async function RegisterUserController(req: Request, res: Response) {
    try {

        const { email, name, password } = req.body
        const pictureData: any = req.file

        if (!pictureData) {
            return res.status(400).send('No se proporcionó un archivo de imagen.')
        } else {
            const response = await RegisterUserService(email, name, password, pictureData.path)
            if (response.error) {
                return res.status(400).json({ error: response.error })
            } else {
                return res.json('Usuario registrado con éxito!')
            }
        }

    } catch (error) {
        return res.status(500).send('Error interno al registrar el usuario.')
    }
}

export default RegisterUserController