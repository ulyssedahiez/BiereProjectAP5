import { join } from "path";
import { promises } from "fs";
import { TastedBeerRepository } from "../../../domain/repository/tasted-beer-repository";
import { TastedBeer } from "../../../domain/entity/tasted-beer";

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
    let biereAmere = tastedBeers.sort((a,b) => a.ibu - b.ibu);
    let couleurPrefere
  
    console.log("1", nombreBiereGoutee)
    console.log("2", nombreBiereAime)
    console.log("3", biereAmere)

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }
}