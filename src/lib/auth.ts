import type { User } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as UserModel from './user.model';

export const mustBeLogged = async (request : RequestEvent) : Promise<User> => {
    if (!request.request.headers.has("Authorization")) {
        throw error(401, {
            message: 'invalid_auth'
        });
    }

    let token = request.request.headers.get("Authorization") as string;
    token = token.replace("Bearer ", "").trim();

    if (token.length < 1) {
        throw error(401, {
            message: 'invalid_auth'
        });
    }

    try {
        return await UserModel.findByToken(token);
    } catch (e) {
        try {
            return await UserModel.findByAPIKey(token);
        } catch (e) {}
    }

    throw error(401, {
        message: 'invalid_auth'
    });
}