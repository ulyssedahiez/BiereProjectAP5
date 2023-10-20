import { Beer, BeerDependencies } from "./beer";

export class TastedBeer extends Beer {
  public hasLiked = false;

  constructor(deps: BeerDependencies) {
    super(deps);
  }
}
