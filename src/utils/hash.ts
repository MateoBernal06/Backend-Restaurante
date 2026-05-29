import bcrypt from "bcryptjs";

const encryptionPassword = async (password: string) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash
  }
  catch(error){
    throw new Error("Error al encriptar la contraseña");
  }
};

const comparePassword = async(password:string, hash: string) =>{
  const compare = await bcrypt.compare(password, hash)
  return compare
}

export {
  encryptionPassword,
  comparePassword
}