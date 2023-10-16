import{Beer,BeerDependencies} from './beer';

export class TastedBeer extends Beer{
  public hasliked = false;

  constructor(deps: BeerDependencies){
    super(deps);
  }