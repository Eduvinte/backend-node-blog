import prisma from "../../db/db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const secreteKey:string | any = process.env.SECRETE_KEY

interface TypeSignin {
    error?: string;
    token?: string;
    userId?: number;
    userName?: string;
    userEmail?: string;
}

async function SiginService(email: string, password: string): Promise<TypeSignin> {
    try {

        // Verify if exista the email in db
        const signin = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!signin) {
            return { error: 'Usuario no existe.' }
        }

        const store = signin.password

        const passwordMatch = await bcrypt.compare(password, store)

        if (passwordMatch) {
            const token:any = jwt.sign({ userId: signin.id, userName: signin.name, userEmail: signin.email }, secreteKey, { expiresIn: '1h' })
            return token
        } else {
            return { error: 'Contraseña incorrecta' }
        }

    } catch (error) {
        return { error: 'Error al loguear el usuario' }
    }

}

export default SiginService