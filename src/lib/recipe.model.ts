
import { db } from '$lib/db';
import type { Recipe } from '@prisma/client';

const string2Object = (str : string) : object => {
    return JSON.parse(str);
}

export const findByUser = async (userId: string) : Promise<Recipe[]> => {
	let list = await db.recipe.findMany({
		where: {
			creator: userId
		}
	});

    list.forEach(entry => {
        // @ts-ignore
        entry.recipe = string2Object(entry.recipe);
    });

    return list;
};

export const create = async (data : any) : Promise<Recipe> => {
    let entry = await db.recipe.create({
        data: data
    });

    // @ts-ignore
    entry.recipe = string2Object(entry.recipe);    

    return entry;
};