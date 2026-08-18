package banking;

public abstract class Account {

    protected int accountNumber;
    protected String accountHolder;
    protected double balance;

    // Constructor
    public Account(int accountNumber, String accountHolder, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;

        // Increase total account count
        Bank.incrementAccounts();
    }

    // Abstract methods
    public abstract void deposit(double amount);

    public abstract void withdraw(double amount);

    public abstract double getBalance();

    // Concrete method
    public void displayAccountDetails() {
        System.out.println("Account Number : " + accountNumber);
        System.out.println("Account Holder : " + accountHolder);
        System.out.println("Balance        : ₹" + balance);
    }
}
