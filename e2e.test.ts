import { test, expect, chromium } from "@playwright/test";

test("Tic Tac Toe game play", async () => {
  const player1Name = "Razvan";
  const player2Name = "Cosmin";
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the game page
  await page.goto("https://razvantimis.github.io/tic-tac-toe/");

  // Start the game by entering player names
  await page.fill("#name1", player1Name); // Fill Player 1's name
  await page.fill("#name2", player2Name); // Fill Player 2's name
  await page.click(".names-dialog button"); // Confirm names

  // Wait for the result dialog to disappear
  await page.waitForSelector(".names-dialog", { state: "hidden" });

  // Player 1 makes their move (X)
  await page.click('.gamecell[data-position="0"]'); // Player 1 clicks the first cell
  await expect(page.locator('.gamecell[data-position="0"]')).toHaveText("X"); // Verify Player 1's move

  // Player 2 makes their move (O)
  await page.click('.gamecell[data-position="1"]'); // Player 2 clicks the second cell
  await expect(page.locator('.gamecell[data-position="1"]')).toHaveText("O"); // Verify Player 2's move

  // Player 1 makes another move (X)
  await page.click('.gamecell[data-position="3"]'); // Player 1 clicks the fourth cell
  await expect(page.locator('.gamecell[data-position="3"]')).toHaveText("X"); // Verify Player 1's move

  // Player 2 makes another move (O)
  await page.click('.gamecell[data-position="4"]'); // Player 2 clicks the fifth cell
  await expect(page.locator('.gamecell[data-position="4"]')).toHaveText("O"); // Verify Player 2's move

  // Player 1 makes the last move to win (X)
  await page.click('.gamecell[data-position="6"]'); // Player 1 clicks the seventh cell
  await expect(page.locator('.gamecell[data-position="6"]')).toHaveText("X"); // Verify Player 1's winning move

  // Check for the winning condition
  await expect(page.locator(".result-dialog")).toBeVisible(); // Verify that the result dialog is visible
  await expect(page.locator(".result-dialog h1")).toHaveText(`${player1Name} Wins!`); // Verify win message

  // Close the browser
  await browser.close();
});
