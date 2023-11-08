import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type editTastedBeersDependencies = {
  tastedBeerRepository: TastedBeerRepository;
}

export async function setBeerLikedOpinionOnTastedBeerUseCase(deps: editTastedBeersDependencies, id:number,hasLiked:boolean): Promise<void> {
  try{
    return await deps.tastedBeerRepository.setBeerLikedOpinionOnTastedBeer(id,hasLiked);
  }
  catch(err){
    console.error(err);
    }

}