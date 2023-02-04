import { JWT_ACCESS_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '$lib/db';
import type { User } from '@prisma/client';

export const hasUsers = async () : Promise<boolean> => {
	return await db.user.count() > 0;
};

export const getFromToken = async (token: string) : Promise<User> => {
	const data = jwt.verify(token, JWT_ACCESS_SECRET);

	const user = await db.user.findUnique({
		where: {
			email: data.email
		}
	});

	if (!user) {
		throw "User not found";
	}

	return user;
}

export const createUser = async (email: string, password: string) => {
	// Check if user exists
	const user = await db.user.findUnique({
		where: {
			email
		}
	});

	if (user) {
		return {
			error: 'User already exists'
		};
	}

	try {
		const user = await db.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, 10)
			}
		});

		return { 
			user, 
			token: generateTokenFor(user) 
		};
	} catch (error) {
		return {
			error: 'Something went wrong'
		};
	}
};

export const generateTokenFor = (user: User) : string => {
	return jwt.sign({
		id: user.id,
		email: user.email
	}, JWT_ACCESS_SECRET, {
		expiresIn: '1d'
	});
}

export const loginUser = async (email: string, password: string) => {
	// Check if user exists
	const user = await db.user.findUnique({
		where: {
			email
		}
	});

	if (!user) {
		return {
			error: 'Invalid credentials'
		};
	}

	// Verify the password
	const passwordIsValid = await bcrypt.compare(password, user.password);

	if (!passwordIsValid) {
		return {
			error: 'Invalid credentials'
		};
	}

	return { 
		token: generateTokenFor(user)
	};
};
