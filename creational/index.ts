// You have three instances: Person, Employee and Shopper.

// You need to create Shopper Alex Banks and Employee Eve Porcello, each has 100 moneys (🤷‍♂‍),
// But you can’t just create them with simple initialization.

// You need to delegate initialization logic to another instance,
//  which you need to design and implement, based on your Creational 
//  patterns’ knowledge. Also, Employee should be initialized only once – 
//  if you try to initialize new instance of it, previously created object
//   should be returned (also, make sense to warn about it in the console).

interface IPerson {
  name: string;
}

class Person implements IPerson {
  protected static instance: Person = null;

  protected constructor(public name: string) {}

  public static getInstance(name: string = 'unnamed person'): Person {
      if (!this.instance) {
          this.instance = new this(name);
      } else {
          console.log('Person is already created.');
      }

      return this.instance;
  }
}

class Shopper extends Person implements IPerson {
  public employed: boolean;
  protected static instance: Shopper = null;

  protected constructor(name: string, public money: number) {
      super(name);
      this.employed = false;
  }

  public static getInstance(name: string, money: number = 0): Shopper {
      if (!Shopper.instance) {
          Shopper.instance = new Shopper(name, money);
      } else {
          console.log('Shopper is already created.');
      }

      return Shopper.instance;
  }
}

class Employee extends Shopper implements IPerson {
  public employed: boolean;
  protected static instance: Employee = null;

  protected constructor(name: string, money: number, public employer: string) {
      super(name, money);
      this.employed = true;
  }

  public static getInstance(name: string, money: number = 0, employer: string = ''): Employee {
      if (!Employee.instance) {
          Employee.instance = new Employee(name, money, employer);
      } else {
          console.log('Employee is already created.');
      }

      return Employee.instance;
  }
}

interface IPersonData {
  name: string;
  money?: number;
}

enum PersonType {
  Shopper = 'shopper',
  Employee = 'employee'
}

abstract class BasePersonFactory {
  public abstract create(type: PersonType, data: IPersonData): IPerson;
}

class PersonFactory extends BasePersonFactory {
  public create(type: PersonType, { name, money }: IPersonData): IPerson {
      debugger;

      if (type === PersonType.Shopper) {
          return Shopper.getInstance(name, money);
      }

      if (type === PersonType.Employee) {
          return Employee.getInstance(name, money);
      }

      throw new Error('There is not such a person');
  }
}

export class CreationalClient {
  public static main(): void {
    const factory = new PersonFactory();
    const shopper = factory.create(PersonType.Shopper, { name: 'Alex Banks', money: 100 });
    const shopper1 = factory.create(PersonType.Shopper, { name: 'Alex Banks 1', money: 800 });
    console.log('shopper', shopper);
    const employee = factory.create(PersonType.Employee, { name: 'Eve Porcello', money: 100 });
    const employee1 = factory.create(PersonType.Employee, { name: 'Eve Porcello 1', money: 900 });
    console.log('employee', employee);
  }
}
