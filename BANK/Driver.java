import banking.*;

public class Driver {

    public static void main(String[] args) {

        System.out.println("================================");
        System.out.println("   BANKING TRANSACTION SYSTEM");
        System.out.println("================================");

        // Creating Savings Account
        SavingsAccount savings =
                new SavingsAccount(101, "Swajay", 10000);

        // Creating Checking Account
        CheckingAccount checking =
                new CheckingAccount(102, "Rahul", 8000);

        // Static method
        System.out.println("\nTotal Accounts: "
                + Bank.getTotalAccounts());

        // Savings Account
        System.out.println("\n----- SAVINGS ACCOUNT -----");

        savings.displayAccountDetails();

        savings.deposit(2000);

        savings.withdraw(1000);

        System.out.println("Current Balance: ₹"
                + savings.getBalance());

        savings.calculateInterest();

        // Checking Account
        System.out.println("\n----- CHECKING ACCOUNT -----");

        checking.displayAccountDetails();

        checking.deposit(3000);

        checking.withdraw(2000);

        System.out.println("Current Balance: ₹"
                + checking.getBalance());

        // Transaction
        System.out.println("\n----- TRANSACTION -----");

        Transaction transaction = new Transaction();

        transaction.performTransaction(savings, 1000);

        // Final balance
        System.out.println("\nFinal Savings Balance: ₹"
                + savings.getBalance());

        System.out.println("\nTransaction Fee: ₹"
                + Transaction.getTransactionFee());

        System.out.println("\n================================");
        System.out.println("       PROGRAM COMPLETED");
        System.out.println("================================");
    }
          }
