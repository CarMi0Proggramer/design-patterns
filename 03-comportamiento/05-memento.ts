/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  constructor(
    private level: number,
    private health: number,
    private position: string
  ) {}

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.getPosition();
  }
}

class Game {
  constructor(
    private level: number = 1,
    private health: number = 100,
    private position: string = "Inicio"
  ) {
    console.log(`
      Jugando en el nivel: ${level}
      salud: ${health}
      posición: ${position}
      `);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
      Jugando en el nivel: ${level}
      salud: ${health}
      posición: ${position}
      `);
  }

  restore(memento: GameMemento) {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(`
      Restauración en el nivel: ${this.level}
      salud: ${this.health}
      posición: ${this.position}
      `);
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | undefined {
    return this.mementos.pop();
  }
}

function main() {
  const game = new Game();
  const history = new GameHistory();

  history.push(game.save());

  game.play(2, 95, "El Valle De Oz");
  history.push(game.save());

  game.play(3, 70, "Bosque Infernal");
  history.push(game.save());

  game.play(4, 50, "Castillo del Dragón");
  game.restore(history.pop()!);
}

main();
