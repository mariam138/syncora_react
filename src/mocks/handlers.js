import { http, HttpResponse } from "msw";

// Check status code when a new user registers to the website
export const handlers = [
    http.post('/dj-rest-auth/registration/', async ({ request }) => {
        const newUser = await request.json()

        return HttpResponse.json(newUser, {status: 201})
    })
]