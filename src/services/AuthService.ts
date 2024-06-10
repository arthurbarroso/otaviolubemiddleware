import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = (process.env.JWT_SECRET as string);

export const genJwt = (email: string, id: Number) => {
  return jwt.sign({email: email, id: id}, secret);
}

export const verifyJwt = (token: string) => jwt.verify(token, secret);

export const hashPass = async (password: string) => {
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
}
