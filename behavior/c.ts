// C)	You have a list of users. Add functionality to 
// subscribe to the changes on it (e.g. after calling push, pop). 
// const users = ["Alex Banks", "Eve Porcello"];

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class UsersSubject implements Subject {
  public state: string[] = ['Alex Banks', 'Eve Porcello'];

  private observers: Observer[] = [];

  public attach(observer: Observer): void {
      const isExist = this.observers.includes(observer);

      if (!isExist) {
          this.observers.push(observer);
      }
  }

  public detach(observer: Observer): void {
      const index = this.observers.indexOf(observer);

      if (index !== -1) {
          this.observers.splice(index, 1);
      }
  }

  public notify(): void {
      for (const observer of this.observers) {
          observer.handle(this.state);
      }
  }

  public addUser(user: string): void {
      this.state.push(user);
      this.notify();
  }

  public removeUser(user: string): void {
      const index = this.state.indexOf(user);

      if (index !== -1) {
          this.state.splice(index, 1);
          this.notify();
      }
  }
}

interface Observer {
  handle(value: string[]): void;
}

class Observer implements Observer {
  public handle(value: string[]): void {
      console.log('handle user state changes', value);
  }
}

export class BehaviorCClient {
  public static main(): void {
    const usersSubject = new UsersSubject();
    const observer1 = new Observer();
    const observer2 = new Observer();

    usersSubject.attach(observer1);
    usersSubject.attach(observer2);

    usersSubject.addUser('Petro');

    usersSubject.detach(observer1);

    usersSubject.addUser('Ivan');
  }
}