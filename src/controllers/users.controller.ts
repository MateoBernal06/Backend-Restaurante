import { CreateUserDTO } from '../types/users.types';
import {encryptionPassword} from '../utils/hash'
import { createUser} from '../models/users.model'
import { Request, Response } from 'express';

const createUserController = async(req: Request, res: Response) => {
  try {
    const {name, surname, email, password, rol, number_phone, address, imagen_link } = req.body
    
    if(!name || !surname || !email || !password || !rol || !number_phone || !address || !imagen_link){
      return res.status(400).send({
        ok: false,
        msg: 'Todos los campos son obligatorios'
      })
    }
    
    const newUser: CreateUserDTO = {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      rol,
      number_phone: number_phone.trim(),
      address: address.trim(),
      imagen_link: imagen_link.trim(),
    }

    if(newUser.password.length < 12 || newUser.password.length > 16){
      return res.status(400).send({
        ok: false,
        msg: 'La contraseña debe tener entre 12 y 16 caracteres'
      })
    }

    newUser.password = await encryptionPassword(newUser.password)

    if(newUser.number_phone.length > 10){
      return res.status(400).send({
        ok: false,
        msg: 'El número de celular ingresado no es válido'
      })
    }

    const user = await createUser(newUser)
    
    return res.status(200).send(user)

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error interno en servidor'
    })
  }
}

export {
  createUserController
}