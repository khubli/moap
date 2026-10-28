# Example: a first message to the orchestrator

This is what you type in your first session, after copying MOAP into a new folder. It names the outcome and the constraints the swarm cannot guess, and nothing about how to build it. (Contoso and Woodgrove Bank are fictional.)

> I want a household budget app for the Contoso family. Every month we download a CSV of transactions from Woodgrove Bank. The app should import that file, put each transaction into a category (groceries, utilities, travel and so on, and let us correct it), and show this month's spending by category next to last month's.
>
> Constraints: it runs on our home laptop, works with no internet connection, and uses no paid APIs. Two people use it, neither of them technical. Our bank data must never leave the laptop.
>
> Success: at the end of a month, importing the file and seeing where the money went takes under five minutes.

## What happens next

1. The orchestrator sets up the folder's own git repository, then writes `docs/PROJECT_BRIEF.md` (the problem, users, outcome, non-negotiables like "bank data never leaves the laptop") and `docs/ROADMAP.md` (for example: import a CSV → categorise with corrections → monthly comparison view).
2. It shows you a short summary of both and asks you to approve or revise. You don't edit the files.
3. It sizes the first piece (here, probably Standard), gets a spec with acceptance criteria such as "AC-2 (Must): a file with a malformed row is imported except that row, which is listed", and a design with a one-command runbook, and asks for your go/no-go.
4. The coder builds it, the reviewer and tester check it against the same criteria, and you get "how to try it" steps and a local commit.
5. Next session, it reads the three files and carries on with the next piece.
