import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

import { Request, Response, NextFunction } from "express"

declare global {
    namespace Express {
      interface Request {
        user?: any; // Declaración de la propiedad user en Request
      }
    }
  }
  

function Authentication(req: Request, res:Response, next:NextFunction){

    const authorization = req.header("Authorization")

    if(!authorization){
        return res.status(500).json('No se proporciono el token.')
    }

    const token = authorization.split(' ')[1]

    const secreteKey:any | string = (process.env.SECRETE_KEY)

    try {
        const decoded:any = jwt.verify(token, secreteKey)
        req.user = decoded 
        next()
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }

}

export default Authentication