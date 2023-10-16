import {PunkAPIBeerRepository} from './punk-api/punk-api-beer-repository';

export function makeTastedBeerRepository() {
  return new PunkAPIBeerRepository();
}
