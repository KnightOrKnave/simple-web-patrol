export interface logger{
  writeLine(log:string):void;
}

export class ConsoleLogger implements logger{
  writeLine(log: string): void {
    console.log(log)
  }
}