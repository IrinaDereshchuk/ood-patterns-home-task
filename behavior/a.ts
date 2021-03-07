// A)	Create a CumulativeSum class that would let you get the sum of the elements as follow:

// const sum1 = new CumulativeSum();
// console.log(sum1.add(10).add(2).add(50).sum);

class CumulativeSum {
  public sum: number = 0;

  public add(value: number): CumulativeSum {
      this.sum = this.sum + value;

      return this;
  }
}

export class BehaviorAClient {
  public static main(): void {
    const sum1 = new CumulativeSum();
    console.log(sum1.add(10).add(2).add(50).sum);
  }
}
