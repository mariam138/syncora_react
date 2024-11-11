// Testing set up to be used with Jest
// Code adapted from the msw documentation
// https://mswjs.io/docs/api/setup-server/
import "@testing-library/jest-dom";
import {setupServer} from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
