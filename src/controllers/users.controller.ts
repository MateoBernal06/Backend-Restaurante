import { CreateUserDTO } from "../types/users.types";
import { encryptionPassword, comparePassword } from "../utils/hash";
import { createUser, loginUser } from "../models/users.model";
import { Request, Response } from "express";
import { createToken } from "../utils/jwt";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, rol, number_phone, address } =
      req.body;
      
      if (
        !name ||
        !surname ||
        !email ||
        !password ||
        !rol ||
        !number_phone ||
        !address
      ) {
        return res.status(400).send({
          ok: false,
          msg: "Todos los campos son obligatorios",
        });
      }
      
    const imagen_link = req.file;
    
    if (!imagen_link) {
      return res.status(400).send({
        ok: false,
        msg: "La imagen es obligatoria",
      });
    }

    const newUser: CreateUserDTO = {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      rol,
      number_phone: number_phone.trim(),
      address: address.trim(),
      imagen_link: imagen_link ? imagen_link.path : "",
    };

    if (newUser.password.length < 12 || newUser.password.length > 16) {
      return res.status(400).send({
        ok: false,
        msg: "La contraseña debe tener entre 12 y 16 caracteres",
      });
    }

    newUser.password = await encryptionPassword(newUser.password);

    if (newUser.number_phone.length > 10) {
      return res.status(400).send({
        ok: false,
        msg: "El número de celular ingresado no es válido",
      });
    }

    const user = await createUser(newUser);

    if (user.error?.code === "23505" && user.error.message.includes("email")) {
      return res.status(400).send({
        ok: false,
        msg: "El correo electrónico ya está registrado",
      });
    }

    if (
      user.error?.code === "23505" &&
      user.error.message.includes("number_phone")
    ) {
      return res.status(400).send({
        ok: false,
        msg: "El número de celular ya está registrado",
      });
    }

    if (user.error) {
      return res.status(400).send({
        ok: false,
        msg: "Error al crear el usuario",
        error: user.error,
      });
    }

    return res.status(200).send({
      ok: true,
      msg: "Usuario creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    const user = {
      email: email.trim().toLowerCase(),
      password: password.trim()
    }

    const response = await loginUser(user);

    if (response.data?.length === 0 || !response.data) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      })
    }

    const login = await comparePassword(user.password, response.data[0].password)

    if(!login){
      return res.status(400).send({
        ok: false,
        msg: "Contraseña incorrecta",
      })
    }

    const token = createToken(response.data[0].id);

    return res.status(200).send({
      ok: true,
      token: token,
      data: response.data[0]
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export { createUserController, loginUserController };
