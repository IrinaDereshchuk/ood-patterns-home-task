class OldCalculator {
  public operations: (term1: number, term2: number, operation: string) => number | { res: number };

  constructor() {
    this.operations = function operations(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return { res: term1 + term2 };
        case 'sub':
          return { res: term1 - term2 };
        default:
          return NaN;
      }
    };
  }
}

class NewCalculator implements INewCalculator {
  public multiply: (term1: number, term2: number) => number;
  public divide: (term1: number, term2: number) => number;

  constructor() {
    this.multiply = function multiply(term1: number, term2: number): number {
      return term1 * term2;
    };

    this.divide = function divide(term1: number, term2: number): number {
      return term1 / term2;
    };
  }
}


// A
// you need to create a new class, which would let interact those two calculators:
// X.multiply(oldCalculator.operations(3,2, "sub"), 6);
interface OldCalculatorLiteralResponse {
  res: number;
}

type OldCalculatorResponse = OldCalculatorLiteralResponse | number;

interface INewCalculator {
  multiply: (term1: OldCalculatorResponse, term2: OldCalculatorResponse) => number;
  divide: (term1: OldCalculatorResponse, term2: OldCalculatorResponse) => number;
}

class NewCalculatorProxy implements INewCalculator {
  constructor(private newCalculator: NewCalculator) {}

  public divide(term1: OldCalculatorResponse, term2: OldCalculatorResponse): number {
      const value1: number = this.adaptParam(term1);
      const value2: number = this.adaptParam(term2);

      return this.newCalculator.divide(value1, value2);
  }

  public multiply(term1: OldCalculatorResponse, term2: OldCalculatorResponse): number {
      const value1: number = this.adaptParam(term1);
      const value2: number = this.adaptParam(term2);

      return this.newCalculator.multiply(value1, value2);
  }

  private adaptParam(value: OldCalculatorResponse): number {
      return (typeof value === 'number') ? value : value.res
  }
}

// B
// B)	Create an UltimateCalculator, that would let you use all the operations at once with one interface,
//  which should reuse OldCalculator and NewCalculator.
interface IUltimateCalculator {
  add: (term1: number, term2: number) => number;
  sub: (term1: number, term2: number) => number;
  multiply: (term1: number, term2: number) => number;
  divide: (term1: number, term2: number) => number;
}

class UltimateCalculator implements IUltimateCalculator {
  constructor(
    private oldCalculator: OldCalculator,
    private newCalculator: NewCalculator
  ) {}

  public add(term1: number, term2: number): number {
    const result = this.oldCalculator.operations(term1, term2, 'add');

    return (typeof result === 'number') ? result : result.res;
  }

  public sub(term1: number, term2: number): number {
    const result = this.oldCalculator.operations(term1, term2, 'sub');

    return (typeof result === 'number') ? result : result.res;
  }

  public multiply(term1: number, term2: number): number {
    return this.newCalculator.multiply(term1, term2);
  }

  public divide(term1: number, term2: number): number {
    return this.newCalculator.divide(term1, term2);
  }
}


// C
// Create a CleverCalculator, that would let you cache results
//  of the UltimateCalculator calculation depending on arguments and type of operation.
class Calculation {
  public result: number;
  private ultimateCalculator: UltimateCalculator = new UltimateCalculator(new OldCalculator(), new NewCalculator());

  constructor(
    public term1: number,
    public term2: number,
    public operation: string
  ) {
    this.result = this.ultimateCalculator[operation](term1, term2);
  }
}

interface ICleverCalculator {
  calculate: (term1: number, term2: number, operation: string) => number;
}

class CleverCalculator implements ICleverCalculator {
  private cachedCalculations: {[key: string]: Calculation} = {};

  public calculate(term1: number, term2: number, operation: string): number {
    const key = this.getKey([String(term1), String(term2), operation]);

    if (!(key in this.cachedCalculations)) {
      const calculation = new Calculation(term1, term2, operation);
      this.cachedCalculations[key] = calculation;
    }

    return this.cachedCalculations[key].result;
  }

  private getKey(dataArray: string[]): string {
    return dataArray.join('_');
  }
}


// D
// Wrap CleverCalculator so on any function call it would log its arguments and type of operation.
class CleverCalculatorBaseDecorator implements ICleverCalculator {
  private cleverCalculator: ICleverCalculator;

  constructor(cleverCalculator: ICleverCalculator) {
    this.cleverCalculator = cleverCalculator;
  }

  public calculate(term1: number, term2: number, operation: string): number {
    return this.cleverCalculator.calculate(term1, term2, operation);
  }
}

class CleverCalculatorLogDecorator
  extends CleverCalculatorBaseDecorator
  implements ICleverCalculator {
  constructor(cleverCalculator: ICleverCalculator) {
    super(cleverCalculator);
  }

  public calculate(term1: number, term2: number, operation: string): number {
    console.log(term1, term2, operation);

    return super.calculate(term1, term2, operation);
  }
}

export class StructuralClient {
  public static main(): void {
    // A
    const oldCalculator = new OldCalculator();
    const newCalculator = new NewCalculatorProxy(new NewCalculator());

    newCalculator.multiply(oldCalculator.operations(3, 2, 'sub'), 6);

    // B, C, D
    const calculator = new CleverCalculatorLogDecorator(new CleverCalculator());
    calculator.calculate(2, 3, 'add');
    calculator.calculate(9, 3, 'divide');
    calculator.calculate(10, 3, 'multiply');
    calculator.calculate(10, 3, 'multiply');
    calculator.calculate(10, 3, 'multiply');
    calculator.calculate(10, 3, 'multiply');
    calculator.calculate(10, 3, 'multiply');
  }
}

