import { TastedBeer } from "../../domain/entity/tasted-beer";
import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type getAllTastedBeersDependencies = {
  tastedBeerRepository: TastedBeerRepository;
}

export async function getAllTastedBeersUseCase(deps: getAllTastedBeersDependencies): Promise<TastedBeer[]> {
  return await deps.tastedBeerRepository.getAllTastedBeers();
}




export async function getTastedBeersUseCaseStats(deps: getAllTastedBeersDependencies): Promise<Object> {
  return await deps.tastedBeerRepository.getAllTastedBeersStats();
}
