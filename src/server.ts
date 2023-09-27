//Imports
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Authentication from '../middleware/authentication'

//Middlewares
const app = express()
app.use(express.json())
app.use(cors())

app.listen(3001, () => console.log("Server online!")) 

// Config multar
app.use('/uploads', express.static('upload'))
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

//Imports Controllers
import RegisterUserController from '../Controllers/User/RegisterUserController'
import SigninController from '../Controllers/User/SignInController'
import CreatePostController from '../Controllers/Post/CreatePostController'
import DeletePostController from '../Controllers/Post/DeletePostController'
import EditPostController from '../Controllers/Post/EditPostController'
import EditUserController from '../Controllers/User/EditUserController'
//Routes
app.post('/registerUser', upload.single('picture'), RegisterUserController)
app.post('/signin', SigninController)
app.post('/createPost/:authorId', Authentication, upload.single('picture'), CreatePostController)
app.delete('/deletePost/:postId', Authentication, DeletePostController)
app.put('/editPost/:postId', Authentication, upload.single('picture'), EditPostController)
app.put('/editEmailUser/:userId', Authentication, upload.single('picture'), EditUserController )
