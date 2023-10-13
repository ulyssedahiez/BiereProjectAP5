import { Beer } from "../../domain/entity/beer";
import { BeerRepository } from "../../domain/repository/beer-repository";

export type getAllBeersDependencies = {
  beerRepository: BeerRepository;
}

export async function getAllBeers(deps: getAllBeersDependencies): Promise<Beer[]> {
  return await deps.beerRepository.getAllBeers();
}