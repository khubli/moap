# Set up a project with MOAP

About 15 minutes from nothing to your first conversation with the orchestrator.

**You need**

- [OpenCode](https://opencode.ai), the open-source coding agent MOAP runs inside. Install it with the instructions on its site.
- Access to at least one model. The shipped `opencode.json` uses [OpenRouter](https://openrouter.ai): one account, many models, some of them free. Any provider OpenCode supports works; you only change model IDs.
- [git](https://git-scm.com). You never type git commands yourself: the orchestrator uses it to save an undo point after every finished piece.

**What it costs:** MOAP itself is free (MIT). What you pay is your model usage. The defaults put free models on the four roles that fill in templates or write tests, and a paid model on the four that make judgement calls; see [Choosing models](#2-choose-models).

## 1. Make a clean copy

Start every project from a **clean copy** of MOAP, without MOAP's own git history.

- **Recommended:** on [MOAP's GitHub page](https://github.com/khubli/moap), choose **Code → Download ZIP**, and unzip it into a new, empty folder for your project. A ZIP never contains git history, so the new project cannot be accidentally connected to the MOAP repository.
- **If you copy a folder on your own machine instead:** do not copy the hidden `.git` folder. If you do, the project inherits MOAP's history and its connection to the MOAP repository, and the first push would send your project there. The orchestrator checks for this at kickoff and stops if it finds it.

You do not need to set up git yourself. On the first session the orchestrator creates the project's own repository and saves the approved plan as its first version.

The copy needs these files:

```
.opencode/agents/       ← all 8 agent files
opencode.json           ← sets the swarm as the default agent, and every agent's model
AGENTS.md               ← operating rules
.env.example            ← the keys this project needs, without the secrets
.gitignore              ← keeps .env and build output out of git
.gitattributes          ← keeps line endings consistent across machines
docs/CAPABILITIES.md    ← capability inventory
docs/PROJECT_BRIEF.md   ← vision and non-negotiables
docs/ROADMAP.md         ← ordered pieces and status
docs/PROJECT_STATE.md   ← state tracking
```

Everything else in the ZIP is about MOAP itself, not your project. Delete it: `README.md` (write your own later, or let the swarm), `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (choose your project's own), `.private-words.example`, `docs/setup.md`, `docs/configuration.md`, `docs/how-it-works.md`, and the folders `docs/images/`, `docs/brand/`, `examples/`, `scripts/` and `.github/`.

## 2. Choose models

Open `opencode.json` and set the `model` for each agent under `agent`. That block is the only template file you edit per project. Pick one model per tier:

| Tier | Roles | What matters | Guidance |
|------|-------|-------------|----------|
| **Tier 1 — Reasoning** | `orchestrator`, `architect`, `reviewer` | Judgement, instruction-following, catching errors | Your strongest model. These agents make decisions that shape everything downstream. |
| **Tier 2 — Execution** | `coder`, `tester` | Code quality, tool use, large context | A strong coding model. The coder writes all the code, so don't economise here. |
| **Tier 3 — Structured** | `requirements`, `ux`, `ui` | Filling well-defined templates | A lighter or cheaper model is fine. Their outputs are checked before anyone acts on them. |

The shipped defaults are a working starting point, not a recommendation for real work: put your strongest coding model on `coder` first, and your strongest reasoning model on `orchestrator`. No amount of process makes a weak coding model dependable. Run `opencode models` to see the IDs your setup can use.

## 3. Add your keys, if the app needs any

OpenCode uses its own model access to run the swarm, so most projects need nothing here at the start. If the app you are building will call a model or an API at runtime, copy `.env.example` to `.env` and fill in the values. No agent can read `.env`, and git ignores it.

## 4. Mark what you have access to (optional)

`docs/CAPABILITIES.md` lists services the swarm may use, each with an **Account available** line set to `unknown`. The orchestrator asks you about them at kickoff; you can fill them in beforehand. Add anything else this project may use (a database, a specific API), and delete what clearly doesn't apply.

## 5. Start your first session

Open the folder in OpenCode. The session opens on the orchestrator. Tell it what you want to build and what outcome you expect, with any hard constraints it cannot guess (a budget, a platform, a deadline, a rule of your domain). See [examples/first-message.md](../examples/first-message.md) for one.

The orchestrator writes `docs/PROJECT_BRIEF.md` and `docs/ROADMAP.md` from your description and asks you to approve them. Then it handles the rest: requirements, architecture, implementation, review and testing, coming back to you for go/no-go on bigger pieces and with plain-language options when something goes wrong. You never author the plan.

**Do not edit `AGENTS.md`, the agent prompts or the other template files** to record your project's rules. Put them in your first message; the orchestrator records them in the brief. Keeping the template untouched means you can pull later MOAP improvements into your project without merging your own content by hand.

## Reusing a project that has already been worked on

Skip this if you made a clean copy. If you copied from a project that has already been used, clear `docs/PROJECT_BRIEF.md`, `docs/ROADMAP.md` and `docs/PROJECT_STATE.md`, and put the `MOAP:UNFILLED` marker back in the brief and the roadmap. Otherwise the orchestrator reads the old project's state as if it were this one. Leave the section headings in place; the orchestrator fills them in. Also delete the old project's `docs/specs/`, `docs/architecture/`, `docs/ux/`, `docs/ui/` and any working notes.

## Three things that switch MOAP off

- **Never start OpenCode with `--auto`.** `opencode --auto` (or "Enable auto-approve permissions" in the command palette) answers every permission prompt with yes. MOAP asks you in exactly one place, before anything is pushed to GitHub, and auto mode would answer for you. Hard blocks still hold; prompts do not.
- **Don't switch to the `build` agent.** It is OpenCode's built-in: full edit access, no requirements, no review, no approval. Switching to it opts out of every gate. The orchestrator is denied permission to hand work to `build` or to the built-in `general` subagent.
- **Don't type `@coder` (or any specialist) yourself.** The seven specialists are hidden from the `@` menu so you don't reach one by accident, but typing the name still works, and it skips the orchestrator and every check.
