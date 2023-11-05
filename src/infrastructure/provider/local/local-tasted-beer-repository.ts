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


  async getAllTastedBeersStats(): Promise<Object> {
    
    const tastedBeers = await this.getAllTastedBeers();
    let nombreBiereGoutee = tastedBeers.length;
    let nombreBiereAime = 0;
    tastedBeers.forEach(item => item.hasLiked === true && nombreBiereAime++);
    let biereAmere = tastedBeers.sort((a,b) => b.ibu - a.ibu);
    let couleurPrefere: (BeerColorIntensity | undefined)[] = [];
    let listeDegree: number[] = [];
    const compteur: Record<BeerColorIntensity | any, number> = {};
    let couleur: BeerColorIntensity | any
    let plusGrandeValeur = -Infinity; 
    let cléLaPlusGrande: string | undefined;


    for (const beer of tastedBeers) {
      if (beer.hasLiked === true) {
        couleurPrefere.push(beer.couleurB)
      }
    };

    for (const beer of tastedBeers) {
      listeDegree.push(beer.abv)
    };
    const somme = listeDegree.reduce((acc, élément) => acc + élément, 0);
    const moyenneDegree = somme / listeDegree.length;

    for (couleur of couleurPrefere) {
      if (!compteur[couleur]) {
        compteur[couleur] = 1
      } else {
        compteur[couleur] += 1
      }
    }
  
    for (const clé in compteur) {
      if (compteur[clé] > plusGrandeValeur) {
        plusGrandeValeur = compteur[clé];
        cléLaPlusGrande = clé;
      }
    }
  
    let pourcentageBiereAime = nombreBiereAime/nombreBiereAime * 100
    const plusAmere = biereAmere.slice(0, 3);


    console.log("nombre de biere goute", nombreBiereGoutee)
    console.log("nombre de biere aime", nombreBiereAime)
    console.log("pourcentage de biere aimée : ", pourcentageBiereAime)
    console.log("moyenne degré biere : ", moyenneDegree)
    console.log("Couleur préféré : ", cléLaPlusGrande);
    console.log("3 biere les plus amère : ", plusAmere)

    const resultats = {
      "nombreBiereGoutee": nombreBiereGoutee,
      "nombreBiereAime": nombreBiereAime,
      "pourcentageBiereAime": pourcentageBiereAime,
      "moyenneDegree": moyenneDegree,
      "couleurPreferee": cléLaPlusGrande,
      "troisBieresPlusAmeres": plusAmere
    };

    return JSON.stringify(resultats)
  }
}