import prisma from "../../db/db"
import bcrypt from 'bcrypt'
async function EditUserService(email: string, name: string, password: string, picture: string, userId: number) {
    try {

        const emailExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (emailExists) {
            return { error: 'El email ya registado, intente otro por favor.' }
        }

        const salt = 10
        const saltRounds = await bcrypt.genSalt(salt)
        const passwordHashed = await bcrypt.hash(password, saltRounds)
        
       if (!email || !name || !password || !picture) {

            const userFound = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            })

            if (!email) {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        email: userFound?.email
                    }
                })
            }else {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                    
                        email: email
                    }
                })
            }

             if (!name){
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        name: userFound?.name
                    }
                })
            }else {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                    
                        name: name
                    }
                })
            }
            
            if (!password){
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        password: userFound?.password
                    }
                })
            } else {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                    
                        password: passwordHashed
                    }
                })
            }

            if(!picture){
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        picture: userFound?.picture
                    }
                })
            }else {
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                    
                        picture: picture
                    }
                })
            }

        } else {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: email,
                    name: name,
                    password: password,
                    picture: picture
                }
            })
        }

    
    }catch (error) {
        console.error(error)
        return { error: 'Intern error on edit this user' }
    }
}

export default EditUserService