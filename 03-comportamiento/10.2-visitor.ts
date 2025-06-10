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
 * !Objetivo:
 * Implementar el patrón Visitor en un sistema de gestión de vehículos
 * que permite realizar operaciones específicas sobre diferentes
 * tipos de vehículos (automóviles, motocicletas y camiones).
 *
 * Estas operaciones incluyen calcular el costo de mantenimiento
 * y verificar si los vehículos cumplen con las normas de emisión.
 */

// Interfaz Visitor
interface Visitor {
  visitCar(car: Car): void;
  visitMotorcycle(motorcycle: Motorcycle): void;
  visitTruck(truck: Truck): void;
}

// Interfaz Vehicle
interface Vehicle {
  accept(visitor: Visitor): void;
}

// Clase concreta - Car
class Car implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    visitor.visitCar(this);
  }
}

// Clase concreta - Motorcycle
class Motorcycle implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    visitor.visitMotorcycle(this);
  }
}

// Clase concreta - Truck
class Truck implements Vehicle {
  private year: number;
  private kilometers: number;
  private loadCapacity: number;

  constructor(year: number, kilometers: number, loadCapacity: number) {
    this.year = year;
    this.kilometers = kilometers;
    this.loadCapacity = loadCapacity;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  getLoadCapacity(): number {
    return this.loadCapacity;
  }

  accept(visitor: Visitor): void {
    visitor.visitTruck(this);
  }
}

// Clase visitante - MaintenanceCostVisitor
class MaintenanceCostVisitor implements Visitor {
  visitCar(car: Car): void {
    const cost =
      car.getKilometers() * 0.1 +
      (new Date().getFullYear() - car.getYear()) * 50;

    console.log(
      `Costo de mantenimiento para el automóvil: $${cost.toFixed(2)}`
    );
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const cost =
      motorcycle.getKilometers() * 0.05 +
      (new Date().getFullYear() - motorcycle.getYear()) * 30;

    console.log(
      `Costo de mantenimiento para la motocicleta: $${cost.toFixed(2)}`
    );
  }

  visitTruck(truck: Truck): void {
    //TODO: Calcular el costo de mantenimiento para el camión
    // cost = Kilómetros recorridos * 0.15 + Capacidad de carga * 20 + (2024 - Año de fabricación) * 100
    const cost =
      truck.getKilometers() * 0.15 +
      truck.getLoadCapacity() * 20 +
      (new Date().getFullYear() - truck.getYear()) * 100;

    console.log(`Costo de mantenimiento para el camión: $${cost.toFixed(2)}`);
  }
}

// Clase visitante - EmissionCheckVisitor
class EmissionCheckVisitor implements Visitor {
  visitCar(car: Car): void {
    const passes = car.getYear() > 2000 && car.getKilometers() < 200000;
    console.log(`Automóvil cumple con emisiones: ${passes ? "Sí" : "No"}`);
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const passes =
      motorcycle.getYear() > 2005 && motorcycle.getKilometers() < 100000;
    console.log(`Motocicleta cumple con emisiones: ${passes ? "Sí" : "No"}`);
  }

  visitTruck(truck: Truck): void {
    const passes = truck.getYear() > 2010 && truck.getKilometers() < 300000;
    console.log(`Camión cumple con emisiones: ${passes ? "Sí" : "No"}`);
  }
}

// ! Código Cliente
// ! Aquí no deben de haber cambios
function main(): void {
  const vehicles: Vehicle[] = [
    new Car(2018, 50_000),
    new Motorcycle(2015, 30_000),
    new Truck(2012, 250_000, 20),
  ];

  console.log(chalk.bold.green("\nCalculando costos de mantenimiento:"));
  const maintenanceVisitor = new MaintenanceCostVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(maintenanceVisitor));

  console.log(chalk.bold.green("\nVerificando emisiones:"));
  const emissionVisitor = new EmissionCheckVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(emissionVisitor));
}

main();
