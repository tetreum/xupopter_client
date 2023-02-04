import { error } from '@sveltejs/kit';
import type { RequestEvent } from '../../$types';
import * as Auth from '../../../lib/auth';
import * as Recipe from '../../../lib/recipe.model';

const JsonResponse = (output : any) => {
    return new Response(JSON.stringify({
        error: 0,
        result: output,
    }));
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event : RequestEvent) {
    const user = await Auth.mustBeLogged(event);
   
    return JsonResponse({
      list: await Recipe.findByUser(user.id)
    });
}
 
/** @type {import('./$types').RequestHandler} */
export async function POST(event : RequestEvent) {
  const user = await Auth.mustBeLogged(event);
  let data = await event.request.json();

  const recipe = await Recipe.create({
    id: data.uuid,
    status: "idle",
    name: data.name,
    creator: user.id,
    recipe: JSON.stringify(data)
  });
 
  return JsonResponse(recipe);
}

