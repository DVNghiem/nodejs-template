import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT_NUMBER) || 10;

async function encryptTextBcrypt(text: string) {
	const result = await bcrypt.hash(text, saltRounds);
	return result;
}

async function compareTextBcrypt(text: string, textEncrypt: string) {
	return bcrypt.compare(text, textEncrypt);
}

export { encryptTextBcrypt, compareTextBcrypt };
