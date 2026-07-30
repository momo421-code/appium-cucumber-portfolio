import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';

/**
 * World Cucumber personnalisé : permet de partager un état léger
 * entre les steps d'un même scénario (ex: dernier produit ajouté),
 * sans polluer les page objects eux-mêmes.
 */
export class CustomWorld extends World {
  lastAddedProduct?: string;
  expectedTotal?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
