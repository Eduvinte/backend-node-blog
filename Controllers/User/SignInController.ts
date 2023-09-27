import { Request, Response } from "express"
import SiginService from "../../Services/User/SignInService"
import prisma from "../../db/db"
import jwt from 'jsonwebtoken'
import { decode } from "punycode"
import dotenv from 'dotenv'

dotenv.config();

async function SigninController(req: Request, res: Response) {
    try {

        const { email, password } = req.body
        const response:any = await SiginService(email, password)

        if (response.error) {
            return res.status(500).json({ error: response.error })
        } else {
            const secreteKey:any | string = (process.env.SECRETE_KEY)

            const decodedToken:any = jwt.verify(response, secreteKey)
            const userId = decodedToken.userId
            const userName = decodedToken.userName
            const userEmail = decodedToken.userEmail
            return res.status(200).json({ userId, userName, userEmail, response })
        }
    } catch (error) {
        return res.status(500).send('Error al loguear el usuario.')
    } finally {
        prisma.$disconnect()
    }

}

export default SigninController