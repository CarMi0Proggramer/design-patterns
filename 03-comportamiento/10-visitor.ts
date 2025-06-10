/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import chalk from "chalk";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;

  visitHauntedHouse(hauntedHouse: HauntedHouse): void;

  visitFerriesWheel(ferriesWheel: FerriesWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerriesWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerriesWheel(this);
  }
}

// Visitors
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      chalk.bold.blue(
        `Niño en Montaña Rusa: Precio con descuento de ${
          rollerCoaster.getPrice() * 0.5
        }`
      )
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      chalk.bold.blue(
        `Niño en Casa del Terror: Precio con descuento de ${
          hauntedHouse.getPrice() * 0.7
        }`
      )
    );
  }
  visitFerriesWheel(ferriesWheel: FerriesWheel) {
    console.log(
      chalk.bold.blue(
        `Niño en Casa del Terror: Precio con descuento de ${
          ferriesWheel.getPrice() * 0.6
        }`
      )
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      chalk.bold.blue(
        `Adulto en Montaña Rusa: Precio con descuento de ${rollerCoaster.getPrice()}`
      )
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      chalk.bold.blue(
        `Adulto en Casa del Terror: Precio con descuento de ${hauntedHouse.getPrice()}`
      )
    );
  }
  visitFerriesWheel(ferriesWheel: FerriesWheel) {
    console.log(
      chalk.bold.blue(
        `Adulto en Casa del Terror: Precio con descuento de ${ferriesWheel.getPrice()}`
      )
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      chalk.bold.blue(
        `Adulto Mayor en Montaña Rusa: Precio con descuento de ${
          rollerCoaster.getPrice() * 0.85
        }`
      )
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      chalk.bold.blue(
        `Adulto Mayor en Casa del Terror: Precio con descuento de ${
          hauntedHouse.getPrice() * 0.85
        }`
      )
    );
  }
  visitFerriesWheel(ferriesWheel: FerriesWheel) {
    console.log(
      chalk.bold.blue(
        `Adulto Mayor en Casa del Terror: Precio con descuento de ${
          ferriesWheel.getPrice() * 0.85
        }`
      )
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerriesWheel(),
  ];

  console.log(chalk.bold.yellow("\nPrecios Normales"));

  console.log(
    chalk.bold.gray(`Montaña Rusa: ${new RollerCoaster().getPrice()}`)
  );

  console.log(
    chalk.bold.gray(`Casa del Terror: ${new HauntedHouse().getPrice()}`)
  );

  console.log(
    chalk.bold.gray(`Rueda de la fortuna: ${new FerriesWheel().getPrice()}`)
  );

  console.log("\n\n");

  console.log(chalk.bold.green("\nVisitante Niño"));

  attractions.forEach((attraction) => attraction.accept(new ChildVisitor()));

  console.log(chalk.bold.green("\nVisitante Adulto"));

  attractions.forEach((attraction) => attraction.accept(new AdultVisitor()));

  console.log(chalk.bold.green("\nVisitante Adulto Mayor"));

  attractions.forEach((attraction) => attraction.accept(new SeniorVisitor()));
}

main();
