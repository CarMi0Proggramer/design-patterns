/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

interface _Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  add(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }

    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements _Iterator<Pokemon> {
  constructor(
    private collection: PokemonCollection,
    private position: number = 0
  ) {}

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }

    return null;
  }

  hasNext(): boolean {
    if (this.position < this.collection.getLength()) {
      return true;
    }

    return false;
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}

function main() {
  const pokedex = new PokemonCollection();

  pokedex.add(new Pokemon("Pikachu", "Eléctrico"));
  pokedex.add(new Pokemon("Squirtle", "Agua"));
  pokedex.add(new Pokemon("Bulbasaur", "Planta"));
  pokedex.add(new Pokemon("Charmander", "Fuego"));
  pokedex.add(new Pokemon("Linx", "Eléctrico"));

  const iterator = pokedex.createIterator();

  while (iterator.hasNext()) {
    const pokemon = iterator.next();

    if (pokemon) {
      console.log(`Pokemon: ${pokemon.name}`);
    }
  }
}

main();
