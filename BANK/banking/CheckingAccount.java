package banking;

public class CheckingAccount extends Account {

    private double overdraftLimit = 5000;

    public CheckingAccount(int accountNumber, String accountHolder, double balance) {
        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void deposit(double amount) {

        if (amount > 0) {
            balance += amount;

            System.out.println("₹" + amount +
                    " deposited into Checking Account.");
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }

    @Override
    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance + overdraftLimit) {

            balance -= amount;

            System.out.println("₹" + amount +
                    " withdrawn from Checking Account.");

        } else {
            System.out.println("Amount exceeds overdraft limit.");
        }
    }

    @Override
    public double getBalance() {
        return balance;
    }
}
