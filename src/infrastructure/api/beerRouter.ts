import { Router } from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { getAllTastedBeersUseCase } from "../../application/use-case/get-all-tasted-beers-use-case";
import { makeBeerRepository } from "../provider/beer-repository-factory";
import { makeTastedBeerRepository } from "../provider/tasted-beer-repository-factory";
import { addTastedBeersUseCase } from "../../application/use-case/add-tasted-beer-use-case";

import { setBeerLikedOpinionOnTastedBeerUseCase } from "../../application/use-case/edit-tasted-beers-use-case";

export function createBeerRouter() {
  const beerRepository = makeBeerRepository();
  const tastedBeerRepository = makeTastedBeerRepository();

  const router = Router();
  router.get("/", async (_, res) => res.json({beers: await getAllBeers({beerRepository})}));
  router.get("/me", async(_, res) => res.json({tastedBeers: await getAllTastedBeersUseCase({tastedBeerRepository})}));
  router.post("/me", async (req, res) => res.json({ beerAdded:   await addTastedBeersUseCase({ tastedBeerRepository, beerRepository }, req.body)}));
  router.put("/me", async(req, res) => res.json({tastedBeers: await setBeerLikedOpinionOnTastedBeerUseCase({tastedBeerRepository},req.body.id,req.body.hasLiked)}));
  
  return router;
}
