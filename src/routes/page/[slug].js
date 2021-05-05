import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(request) {
  const { slug } = request;

  const article = await db.get(slug);

  if (article) {
    return {
      body: {
        article,
      },
    };
  }
}
