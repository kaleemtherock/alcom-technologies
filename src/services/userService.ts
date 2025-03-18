import pool from '../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { sendEmail } from '../utils/emailService';
import crypto from 'crypto';

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, 'student', CURRENT_TIMESTAMP)
       RETURNING id, name, email, role, created_at`,
      [userData.name, userData.email, hashedPassword]
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error: any) {
    await client.query('ROLLBACK');
    if (error.code === '23505') {
      throw new Error('Email already exists');
    }
    throw error;
  } finally {
    client.release();
  }
};

export const verifyUser = async (email: string, password: string) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const { password_hash, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    return {
      user: userWithoutPassword,
      token
    };
  } finally {
    client.release();
  }
};

export const getUserById = async (userId: string) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const generateResetToken = async (email: string) => {
  const client = await pool.connect();
  try {
    const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user.rows[0]) throw new Error('User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await client.query(
      `UPDATE users 
       SET reset_token = $1, reset_token_expiry = $2 
       WHERE email = $3`,
      [resetToken, resetTokenExpiry, email]
    );

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `Click here to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    });

    return true;
  } finally {
    client.release();
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM users 
       WHERE reset_token = $1 
       AND reset_token_expiry > NOW()`,
      [token]
    );

    if (!result.rows[0]) throw new Error('Invalid or expired reset token');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.query(
      `UPDATE users 
       SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL 
       WHERE reset_token = $2`,
      [hashedPassword, token]
    );

    return true;
  } finally {
    client.release();
  }
};

export const sendVerificationEmail = async (userId: string, email: string) => {
  const client = await pool.connect();
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await client.query(
      `UPDATE users 
       SET verification_token = $1,
           verification_token_expiry = $2
       WHERE id = $3`,
      [verificationToken, expiryTime, userId]
    );

    await sendEmail({
      to: email,
      subject: 'Verify Your Email',
      text: `Please verify your email by clicking this link: ${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    });

    return true;
  } finally {
    client.release();
  }
};

export const verifyEmail = async (token: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE users 
       SET email_verified = true,
           verification_token = NULL,
           verification_token_expiry = NULL
       WHERE verification_token = $1
       AND verification_token_expiry > NOW()
       RETURNING id, email`,
      [token]
    );

    if (!result.rows[0]) {
      throw new Error('Invalid or expired verification token');
    }

    return result.rows[0];
  } finally {
    client.release();
  }
};