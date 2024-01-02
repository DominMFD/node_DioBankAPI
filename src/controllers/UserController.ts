import { Request, Response } from "express"
import { UserService } from "../services/UserService"

export class UserController {

    userService: UserService

    constructor (
        userService = new UserService()
    ) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {

            
            const user = request.body

            if(!user.name) {
                return response.status(400).json({message: 'Bad request: nome obrigatório'})
            }
            if (!user.email) {
                return response.status(400).json({message: 'Bad request: email obrigatório'})
            }

            if(!user.password) {
                return response.status(400).json({message: 'Bad request: senha obrigatório'})
            }
            this.userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({message: 'Usuário criado'})
        }

    getUser = async (request: Request, response: Response) => {
        const { userEmail } = request.params
        const user = await this.userService.getUser(userEmail)
        return response.status(200).json( {
            userId: user?.id_user,
            name: user?.name,
            email: user?.email,
            password: user?.password,
            balance: user?.balance,
        } )
    }

    deleteUser = (request: Request, response: Response) => {

        
    }

    getAllUsers = async (request: Request, response: Response) => {
        const users = await this.userService.getAllUsers()
        return response.json(users)
    }
}