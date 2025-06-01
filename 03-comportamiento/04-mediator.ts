/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class ChatRoom {
  private users: User[] = [];

  constructor(public title: string) {}

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string) {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  constructor(private username: string, private chatRoom: ChatRoom) {
    chatRoom.addUser(this);
  }

  sendMessage(message: string) {
    console.log(`${this.username} sends: ${message}`);
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string) {
    console.log(
      `${this.username} receives: ${message} from ${sender.username}`
    );
  }
}

function main() {
  const chatRoom = new ChatRoom("Work Group");

  const user1 = new User("Carlos Miguel", chatRoom);
  const user2 = new User("Fernando Herrera", chatRoom);
  const user3 = new User("El Temach", chatRoom);

  user1.sendMessage("Hello my friends!!");
  user2.sendMessage("Hi Carlos, How are you?");
  user3.sendMessage("How do you feel today, Carlos?");
}

main();
