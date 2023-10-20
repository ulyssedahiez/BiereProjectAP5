import {Router} from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { getAllTastedBeersUseCase, getTastedBeersUseCaseStats } from "../../application/use-case/get-all-tasted-beers-use-case";
import { makeBeerRepository } from "../provider/beer-repository-factory"; 
import { makeTastedBeerRepository } from "../provider/tasted-beer-repository-factory";


export function createBeerRouter() {
const beerRepository = makeBeerRepository();
const tastedBeerRepository = makeTastedBeerRepository();

  const router = Router();
  router.get("/", async (_, res) => res.json({beers: await getAllBeers({beerRepository})}));
  router.get("/me", async(_, res) => res.json({tastedBeers: await getAllTastedBeersUseCase({tastedBeerRepository})}));
  // router.post("/me", async(_, res) => res.json({tastedBeers: await addTastedBeersUseCase({tastedBeerRepository})}));
  // router.put("/me", async(_, res) => res.json({tastedBeers: await editTastedBeersUseCase({tastedBeerRepository})}));
  router.get("/me/stats", async(_, res) => res.json({tastedBeers: await getTastedBeersUseCaseStats({tastedBeerRepository})}));
  
  return router;
}