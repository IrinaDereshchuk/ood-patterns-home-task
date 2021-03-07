// B)	Given class SpecialMath create a new instance Command, 
// which would store all the commands given to the SpecialMath 

class SpecialMath {
  private _num: number;

  constructor(num) {
      this._num = num;
  }

  public square(): number {
      return this._num ** 2;
  }

  public cube(): number {
      return this._num ** 3;
  }

  public squareRoot(): number {
      return Math.sqrt(this._num);
  }
}

interface OperationCommand {
  execute(): void;
}
class SquareCommand implements OperationCommand {
  constructor(private specialMath: SpecialMath) {}

  public execute(): void {
      this.specialMath.square();
  }
}

class CubeCommand implements OperationCommand {
  constructor(private specialMath: SpecialMath) {}

  public execute(): void {
      this.specialMath.cube();
  }
}

class SquareRoot implements OperationCommand {
  constructor(private specialMath: SpecialMath) {}

  public execute(): void {
      this.specialMath.squareRoot();
  }
}

const operationMap = new Map<string, ({ new(specialMath: SpecialMath): OperationCommand })>();
operationMap
  .set('square', SquareCommand)
  .set('cube', CubeCommand)
  .set('squareRoot', SquareRoot);

  interface Command {
    execute(operation: string): void;
  }
  
  class CalculationsCommand implements Command {
    public commandsExecuted: string[] = [];
  
    constructor(private specialMath: SpecialMath) {}
  
    public execute(operationName: string): void {
        const operation = operationMap.get(operationName);
  
        if (operation) {
            new operation(this.specialMath);
            this.trackCommandExecution(operationName);
  
            return;
        }
  
        throw new Error('Operation is not exist');
    }
  
    private trackCommandExecution(commandName: string): void {
        this.commandsExecuted.push(commandName);
    }
  }

export class BehaviorBClient {
  public static main(): void {
    const command = new CalculationsCommand(new SpecialMath(5));
    command.execute('cube');
    command.execute('squareRoot');
    command.execute('square');

    console.log(command.commandsExecuted);
  }
}