/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import chalk from "chalk";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move() {
    console.log(chalk.bold.blue("El pato nada rápidamente sobre el agua"));
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log(chalk.bold.green("El pato vuela elegantemente sobre el agua"));
  }
}

class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log(chalk.bold.yellow("El pato camina torpemente por la orilla"));
  }
}

class Duck {
  constructor(
    private name: string,
    private movementStrategy: MovementStrategy
  ) {
    console.log(chalk.bold.grey(`${name} listo para correr`));
  }

  performMovement() {
    console.log(`${this.name} se prepara para moverse...`);
    this.movementStrategy.move();
    console.log("\n");
  }

  setMovementStrategy(strategy: MovementStrategy) {
    this.movementStrategy = strategy;
    console.log(chalk.bold.yellow(`${this.name} cambió de estrategia`));
  }
}

function main() {
  const duck1 = new Duck("MCQueen", new SwimFast());
  const duck2 = new Duck("Fly Duck", new FlyOverWater());
  const duck3 = new Duck("Clumsy Duck", new WalkClumsily());
  console.log("\n");

  duck1.performMovement();
  duck2.performMovement();
  duck3.performMovement();

  duck3.setMovementStrategy(new FlyOverWater());
  duck3.performMovement();
}

main();
