import prisma from "../../db/db"
import bcrypt from 'bcrypt'
// Define un tipo para la respuesta de RegisterUserService
interface RegisterUserResponse {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    pictureData?: string;
    error?: string;
}


async function RegisterUserService(email: string, name: string, password: string, pictureData: any): Promise<RegisterUserResponse>{
    try {

        // Verify if email alredy exists in the db
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return {error: "El correo electronico ya está registrado."}
        }

        // Encrypted the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)

        const hashedPassword = await bcrypt.hash(password, salt)
        
        // Query for create the user
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                picture: pictureData
            }
        })

        return newUser

    } catch (error) {
        return { error: "Hubo un error al registrar el usuario." }
    } finally {
        await prisma.$disconnect()
    }
}

export default RegisterUserService