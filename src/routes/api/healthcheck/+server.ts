import type { RequestEvent } from '../../$types';

/** @type {import('./$types').RequestHandler} */
export async function GET(event : RequestEvent) {
    return new Response("ALIVE");
}