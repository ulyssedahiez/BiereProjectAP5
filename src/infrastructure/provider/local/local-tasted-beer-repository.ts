import { join } from "path";
import { promises } from "fs";
import { TastedBeerRepository } from "../../../domain/repository/tasted-beer-repository";
import { TastedBeer } from "../../../domain/entity/tasted-beer";
import { BeerColorIntensity } from "../../../domain/entity/beer-color-intensity";

export class LocalTastedBeerRepository implements TastedBeerRepository {
  private filePath: string;

  constructor() {
    this.filePath = join(__dirname, "../../../../data/prefered-beers.json");
  }

  async getAllTastedBeers(): Promise<TastedBeer[]> {
    try {
      const data = await promises.readFile(this.filePath);

      return JSON.parse(data.toString()).tastedBeers;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async addTastedBeer(tastedBeer: TastedBeer): Promise<void> {
    const tastedBeers = await this.getAllTastedBeers();

    const hasAlreadyTasted = !!tastedBeers.find(({ id }) => id === tastedBeer.id);

    if (hasAlreadyTasted) {
      return;
    }

    tastedBeers.push(tastedBeer);

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }

  async setBeerLikedOpinionOnTastedBeer(id: number, hasLiked: boolean): Promise<void> {
    const tastedBeers = await this.getAllTastedBeers();
    const tastedBeer = tastedBeers.find((tastedBeer) => tastedBeer.id === id);

    if (!tastedBeer) {
      throw new Error("Not found");
    }

    const indexOfTastedBeer = tastedBeers.map(({ id }) => id).indexOf(id);

    tastedBeer.hasLiked = hasLiked;

    tastedBeers[indexOfTastedBeer] = tastedBeer;

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }


  async getAllTastedBeersStats(): Promise<void> {
    const tastedBeers = await this.getAllTastedBeers();
    let nombreBiereGoutee = tastedBeers.length;
    let nombreBiereAime = 0;
    tastedBeers.forEach(item => item.hasLiked === true && nombreBiereAime++);
    let biereAmere = tastedBeers.sort((a,b) => b.ibu - a.ibu);
    let couleurPrefere: (BeerColorIntensity | undefined)[] = [];

    // let mostFrequentCat
    // const maximumOfCats = {}
    // let maximumCount = 0
    
    for (const beer of tastedBeers) {
      couleurPrefere.push(beer.couleurB)
    };
    console.log("liste des couleurs : ",  couleurPrefere)

    const compteur: Record<BeerColorIntensity | any, number> = {};
    let couleur: BeerColorIntensity | any
    for (couleur of couleurPrefere) {
      if (!compteur[couleur]) {
        compteur[couleur] = 1
      } else {
        compteur[couleur] += 1
      }
    }
    console.log("voici le compteur : ", compteur)
    //   if(compteur[couleur] > maximumCount) {
    //     maximumCount = compteur[couleur];
    //     mostFrequentCat = couleur;
    //   }
    // }


    console.log("nombre de biere goute", nombreBiereGoutee)
    console.log("nombre de biere aime", nombreBiereAime)
    console.log("biere amere", biereAmere)
    console.log("couleur prefere", couleurPrefere)

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }
}