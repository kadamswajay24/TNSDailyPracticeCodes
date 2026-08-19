package banking;

public class SavingsAccount extends Account {

    private double interestRate = 4.0;

    public SavingsAccount(int accountNumber, String accountHolder, double balance) {
        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void deposit(double amount) {

        if (amount > 0) {
            balance += amount;

            System.out.println("₹" + amount +
                    " deposited into Savings Account.");
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }

    @Override
    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance) {
            balance -= amount;

            System.out.println("₹" + amount +
                    " withdrawn from Savings Account.");
        } else {
            System.out.println("Insufficient balance or invalid amount.");
        }
    }

    @Override
    public double getBalance() {
        return balance;
    }

    // Savings-specific functionality
    public void calculateInterest() {

        double interest = balance * interestRate / 100;

        System.out.println("Interest : ₹" + interest);
    }
          }
