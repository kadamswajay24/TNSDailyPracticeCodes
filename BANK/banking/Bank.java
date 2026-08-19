package banking;

public class Bank {

    // Static variable shared by all accounts
    private static int totalAccounts = 0;

    // Method to increase account count
    public static void incrementAccounts() {
        totalAccounts++;
    }

    // Static method to get total accounts
    public static int getTotalAccounts() {
        return totalAccounts;
    }
}w
