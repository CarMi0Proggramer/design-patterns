/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import chalk from "chalk";
import { sleep } from "../helpers/sleep";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State = new WaitingForMoney(this);

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  getStateName(): string {
    return this.state.name;
  }

  setState(state: State) {
    this.state = state;

    console.log(chalk.gray(`\nEl estado cambió: ${state.name}`));
  }
}

class WaitingForMoney implements State {
  name: string = "Esperando Dinero";

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log(
      chalk.cyan("Dinero insertado. Ahora puedes seleccionar un producto")
    );

    this.vendingMachine.setState(new SelectingProduct(this.vendingMachine));
  }

  selectProduct(): void {
    console.log(chalk.red("❌ Primero debes de insertar dinero."));
  }

  dispenseProduct(): void {
    console.log(chalk.red("❌ Primero debes de insertar dinero."));
  }
}

class SelectingProduct implements State {
  name: string = "Seleccionando Producto";

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log(chalk.red("❌ El dinero ya ha sido insertado."));
  }

  selectProduct(): void {
    console.log(chalk.green("Producto Seleccionado"));
    console.log(chalk.yellow("Por favor espera mientras lo dispensamos..."));
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log(chalk.red("❌ Primero selecciona un producto."));
  }
}

class DispensingProduct implements State {
  name: string = "Despachando Producto";

  constructor(private vendingMachine: VendingMachine) {
    setTimeout(() => {
      this.vendingMachine.dispenseProduct();
    }, 100);
  }

  insertMoney(): void {
    console.log(chalk.red("❌ Espera mientras entregamos el producto."));
  }

  selectProduct(): void {
    console.log(chalk.red("❌ Espera mientras entregamos el producto."));
  }

  dispenseProduct(): void {
    console.log(chalk.green("Despachando producto, por favor espere..."));
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));

    setTimeout(() => {
      console.log(
        chalk.bold.green("✅ Producto despachado. Gracias por su compra!")
      );
    }, 1000);
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();

    console.log(
      chalk.bold(`Selecciona una opción: ${vendingMachine.getStateName()}`)
    );

    selectedOption = prompt(
      `\n1.Insertar Dinero \n2. Seleccionar producto \n3. Dispensar producto \n4.Salir \n\nOpción: `
    );

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log(chalk.bold.yellow("Cerrando la dispensadora"));
        break;
      default:
        console.log(chalk.bold.red("Opción inválida"));
        break;
    }

    await sleep(5000);
  } while (selectedOption !== "4");
}

main();
