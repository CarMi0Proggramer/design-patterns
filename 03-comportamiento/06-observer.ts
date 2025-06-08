/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];

  constructor(private name: string) {}

  subscribe(observer: Observer) {
    this.subscribers.push(observer);

    console.log(`Nuevo suscriptor al canal ${this.name}`);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`Un suscriptor se ha dado de baja "${this.name}"\n`);
  }

  uploadVideo(videoTitle: string) {
    console.log(
      `\nCanal ${this.name} ha subido un nuevo video ${videoTitle}\n`
    );

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  notify(videoTitle: string): void {
    console.log(
      `${this.name} ha sido notificado del nuevo video: ${videoTitle}`
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Fernando Herrera");

  const carlos = new Subscriber("Carlos Miguel");
  const ernesto = new Subscriber("Ernesto");
  const liorge = new Subscriber("Liorge Kevin");

  channel.subscribe(carlos);

  channel.uploadVideo("Curso de Angular 19");

  channel.subscribe(ernesto);
  channel.subscribe(liorge);

  channel.uploadVideo("Curso de React desde CERO");

  channel.unsubscribe(ernesto);

  channel.uploadVideo("Curso de PHP/Laravel");
}

main();
