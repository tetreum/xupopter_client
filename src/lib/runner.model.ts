import { db } from '$lib/db';
import type { Runner } from "@prisma/client";

export const all = async () : Promise<Runner[]> => {
    const runners = await db.runner.findMany();

    // try to find a locally hosted runner
    if (runners.length === 0) {
        try {
            await fetch("http://localhost:8089/api/health");
            console.log("Saving Local Runner");
            
            create({
                name: "Localhost",
                address: "http://localhost:8089",
                creator: ""
            });
        } catch (e) {}
    }

    return runners;
};

export const create = async (data : any) : Promise<Runner> => {
    return await db.runner.create({
        data: data
    });
};