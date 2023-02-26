import { error } from '@sveltejs/kit';
import type { RequestEvent } from '../../$types';
import * as Auth from '../../../lib/auth';
import * as Runner from '../../../lib/runner.model';

const JsonResponse = (output : any) => {
    return new Response(JSON.stringify({
        error: 0,
        result: output,
    }));
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event : RequestEvent) {
    await Auth.mustBeLogged(event);
   
    return JsonResponse({
      list: await Runner.all()
    });
}
 
/** @type {import('./$types').RequestHandler} */
export async function POST(event : RequestEvent) {

  const user = await Auth.mustBeLogged(event);
  let data;
  try {
    data = await event.request.json();
  } catch (e) {
    return new Response(JSON.stringify({
        error: 400,
        result: 'invalid_request',
    }), {
      status: 400
    });
  }

  const runner = await Runner.create({
    name: data.name,
    creator: user.id,
    address: data.address
  });
 
  return JsonResponse(runner);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(event : RequestEvent) {
  const user = await Auth.mustBeLogged(event);
  let data;
  try {
    data = await event.request.json();
  } catch (e) {}
 
  return JsonResponse({
    list: await Runner.removeById(data.id)
  });
}
