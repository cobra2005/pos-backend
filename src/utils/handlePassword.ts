import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    try {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10') || 10;
        if(isNaN(saltRounds) || saltRounds < 1) {
            throw new Error('Invalid BCRYPT_ROUNDS value in environment variables');
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Failed to hash password');
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        if(!password || !hashedPassword) {
            throw new Error('Missing password or hashedPassword for comparison');
        }
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        console.error(`Error comparing password: ${err}`);
        throw new Error('Failure to compare passwords');
    }
}