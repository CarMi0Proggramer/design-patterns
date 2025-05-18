/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basic") {
      console.log("Basic support: solving a basic problem...");
      return;
    }

    console.log("Basic support: passing the problem to advanced support");
    super.handle(request);
  }
}

class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "advanced") {
      console.log("Advanced support: solving an advanced problem...");
      return;
    }

    console.log(
      "Advanced support: passing the problem to more advanced support"
    );
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "expert") {
      console.log("Expert support: solving an expert problem...");
      return;
    }

    console.log("Expert support: sorry, we can't solve your problem");
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  const problem1 = "advanced";
  const problem2 = "expert";
  const problem3 = "basic";
  const problem4 = "unknown";

  basicSupport.handle(problem1);
  basicSupport.handle(problem2);
  basicSupport.handle(problem3);
  basicSupport.handle(problem4);
}

main();
