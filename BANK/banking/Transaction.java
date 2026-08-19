package banking;

public final class Transaction {

    // Final variable - fixed transaction fee
    private static final double transactionFee = 10.0;

    // Final method - cannot be overridden
    public final void performTransaction(Account account, double amount) {

        System.out.println("\n--- Transaction Processing ---");

        if (amount > transactionFee) {

            double actualAmount = amount - transactionFee;

            account.deposit(actualAmount);

            System.out.println("Transaction Amount : ₹" + amount);
            System.out.println("Transaction Fee    : ₹" + transactionFee);
            System.out.println("Amount Deposited   : ₹" + actualAmount);

            System.out.println("Transaction completed successfully.");

        } else {

            System.out.println(
                    "Transaction amount must be greater than transaction fee."
            );
        }
    }

    // Getter for transaction fee
    public static double getTransactionFee() {
        return transactionFee;
    }
}
