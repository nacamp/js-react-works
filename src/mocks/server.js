import { setupServer } from 'msw/node';
// import { db } from './db';
import {handlers} from "./handlers"

// for node/test environments
export const server = setupServer(...handlers);