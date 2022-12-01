import bcrypt from "bcrypt";

export const createPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
