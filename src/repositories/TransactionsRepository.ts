import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

      const initialIncome = 0;
      const initialOutcome = 0;
      const income = this.transactions.reduce((acumulator, currentValue) => {
        if(currentValue.type === 'income') {
          return acumulator + currentValue.value;
        } else {
          return acumulator;
        }
      }, initialIncome) || 0;

      const outcome = this.transactions.reduce((acumulator, currentValue) => {
        if(currentValue.type === 'outcome') {
          return acumulator + currentValue.value;
        }else {
          return acumulator;
        }
      }, initialOutcome) || 0;
    const total = (income - outcome) || 0;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transac = new Transaction({ title, value, type });

    this.transactions.push(transac);

    return transac;
  }
}

export default TransactionsRepository;
