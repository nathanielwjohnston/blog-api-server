import bcrypt from "bcryptjs";

async function generateHash(password) {
  const saltLength = 10;
  const hashedPassword = await bcrypt.hash(password, saltLength);
  return hashedPassword;
}

async function validatePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

export { generateHash, validatePassword };
