import { test, expect, chromium } from "@playwright/test";

test("Tic Tac Toe game play", async () => {
  const player1Name = "Razvan";
  const player2Name = "Cosmin";

  // Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the game page
  await page.goto("https://razvantimis.github.io/tic-tac-toe/");

  // Start the game by entering player names
  await page.fill("#name1", player1Name); // Fill Player 1's name
  await page.fill("#name2", player2Name); // Fill Player 2's name
  await page.getByRole("button", { name: "Confirm" }).click(); // Confirm names

  // Wait for the names dialog to disappear
  await page.waitForSelector(".names-dialog", { state: "hidden" });

  // Function to simulate a player move
  const makeMove = async (position: number, expectedText: string) => {
    const cell = page.getByTestId(`cell-${position}`);
    await cell.click(); // Player clicks the cell
    await expect(cell).toHaveText(expectedText); // Verify move
  };

  // Player 1 makes their moves (X)
  await makeMove(0, "X");

  // Player 2 makes their move (O)
  await makeMove(1, "O");

  // Player 1 makes another move (X)
  await makeMove(3, "X");

  // Player 2 makes another move (O)
  await makeMove(4, "O");

  // Player 1 makes the last move to win (X)
  await makeMove(6, "X");

  // Check for the winning condition
  await expect(page.locator(".result-dialog")).toBeVisible(); // Verify that the result dialog is visible
  await expect(
    page.getByRole("heading", { name: `${player1Name} Wins!` })
  ).toBeVisible(); // Verify win message

  // Close the browser
  await browser.close();
});
