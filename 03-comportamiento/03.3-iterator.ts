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

interface CustomIterator<T> {
  hasNext(): boolean;
  next(): T | null;
  current(): T | null;
}

// Clase que representa una Carta de la baraja
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa la colección de Cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;
  }

  *getCard(): IterableIterator<Card> {
    yield* this.cards;
  }

  getCardAt(index: number): Card | null {
    if (this.cards[index]) {
      return this.cards[index];
    }

    return null;
  }

  createIterator(): CardIterator {
    return new CardIterator(this);
  }
}

class CardIterator implements CustomIterator<Card> {
  constructor(
    private collection: CardCollection,
    private position: number = 0
  ) {}

  hasNext(): boolean {
    if (this.collection.getCardAt(this.position + 1)) {
      return true;
    }

    return false;
  }

  next(): Card | null {
    return this.collection.getCardAt(this.position++);
  }

  current(): Card | null {
    return this.collection.getCardAt(this.position);
  }
}

// Código Cliente para probar el iterador

function main(): void {
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección
  deck.addCard(new Card("As de Corazones", 1));
  deck.addCard(new Card("Rey de Corazones", 13));
  deck.addCard(new Card("Reina de Corazones", 12));
  deck.addCard(new Card("Jota de Corazones", 11));

  // Recorrer la colección en orden usando for...of
  console.log("Recorriendo la colección de cartas:");
  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }

  const cardIterator = deck.createIterator();

  while (cardIterator.hasNext()) {
    const card = cardIterator.next()!;

    console.log(`Card: ${card.name}`);
  }
}

main();
