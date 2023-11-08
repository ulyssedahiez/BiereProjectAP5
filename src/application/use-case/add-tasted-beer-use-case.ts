import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

import { TastedBeer } from "../../domain/entity/tasted-beer";
import { BeerRepository } from "../../domain/repository/beer-repository";

export type addTastedBeersDependencies = {
  tastedBeerRepository: TastedBeerRepository;
  beerRepository: BeerRepository;
};

export async function addTastedBeersUseCase(deps: addTastedBeersDependencies, beerd: TastedBeer): Promise<void> {
  try {
    const beers = await deps.beerRepository.getAllBeers();
    const beer = beers.find((beerz) => beerz.id === beerd.id);
    if (!beer) {
      throw new Error("Not found");
    }

    const tastedBeer = new TastedBeer({ id: beer.id, name: beer.name });
    tastedBeer.hasLiked = beerd.hasLiked;
    return await deps.tastedBeerRepository.addTastedBeer(tastedBeer);
  } catch (err) {
    console.error(err);
  }
}
