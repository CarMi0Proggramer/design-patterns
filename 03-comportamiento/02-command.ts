/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("Lights turned on");
  }

  turnOff(): void {
    console.log("Lights turned off");
  }
}

class Fan {
  on(): void {
    console.log("Fan turned on");
  }

  off(): void {
    console.log("Fan turned off");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log(`Button: ${button} does not have a command assigned`);
  }
}

function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const pressedButton =
      prompt(`Press a remote control's button
      1. Turn on the lights 
      2. Turn off the lights 
      3. Turn on the fan 
      4. Turn off the fan 

      Button: 
      `) ?? "";

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      `\nWant to continue? (y/n)`
    )?.toLocaleLowerCase();

    continueProgram = continueProgramResponse == "y";
  } while (continueProgram);
}

main();
