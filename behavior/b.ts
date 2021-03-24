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

enum CommandType {
  Cube = 'cube',
  Square = 'square',
  SquareRoot = 'squareRoot'
}

  interface Command {
    cube(): void;
    square(): void;
    squareRoot(): void;
  }
  
  class CalculationsCommand implements Command {
    public commandsExecuted: CommandType[] = []; // use enum to avoid magic strings
  
    constructor(private specialMath: SpecialMath) {}

    cube(): void {
      new CubeCommand(this.specialMath);
      this.trackCommandExecution(CommandType.Cube);
    }

    square(): void {
      new SquareCommand(this.specialMath);
      this.trackCommandExecution(CommandType.Square);
    }

    squareRoot(): void {
      new SquareRoot(this.specialMath);
      this.trackCommandExecution(CommandType.SquareRoot);
    }
  
    private trackCommandExecution(commandName: CommandType): void {
        this.commandsExecuted.push(commandName);
    }
  }

export class BehaviorBClient {
  public static main(): void {
    const command = new CalculationsCommand(new SpecialMath(5));
    // to make the client able to avoid extra information about command
    // I would like to get rid of magic strings in favor of using separate methods for different math operations
    // also separate methods are more understandable and readable
    command.cube(); 
    command.square();
    command.squareRoot();

    console.log(command.commandsExecuted);
  }
}