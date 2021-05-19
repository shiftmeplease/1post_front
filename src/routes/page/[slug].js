import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(request) {
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
