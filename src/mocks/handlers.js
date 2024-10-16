import rest from "msw";

const baseURL = "https://syncora-api-ecc74194384c.herokuapp.com/ ";

// Check status code when a new user registers to the website
export const handlers = [
  //   http.post(`${baseURL}dj-rest-auth/registration/`, async ({ request }) => {
  //     const newUser = await request.json();

  //     return HttpResponse.json(newUser, { status: 200 });
  //   }),
  rest.post(`${baseURL}dj-rest-auth/registration/`, async (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];
