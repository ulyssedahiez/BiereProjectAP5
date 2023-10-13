import {Router} from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";



export function createBeerRouter() {
  const router = Router();
  router.get("/", (_, res) => res.json({beers: getAllBeers({})}));
  return router;
}