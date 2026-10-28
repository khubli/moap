# Configuration

MOAP has very few settings on purpose. This page lists every one, what each agent is allowed to do, and every file the swarm writes.

## `opencode.json`

| Key | Default | What it does |
|---|---|---|
| `default_agent` | `orchestrator` | The agent a session opens on. Leave it: any other value starts sessions outside the swarm. |
| `agent.<name>.model` | see the file | The model each of the eight agents runs on. The only per-project edit. See the tier table in [setup](setup.md#2-choose-models). |

Behaviour and permissions live in the agent files, never in `opencode.json`, so changing a model never changes what an agent does or may touch.

## Secrets: `.env`

| Key | Needed when |
|---|---|
| `OPENROUTER_API_KEY` | The app you are building calls a model through OpenRouter at runtime. The swarm itself does not need it; OpenCode has its own model access. |
| `JEV_API_KEY` | The app uses TypeSafe's typed decision model (see `docs/CAPABILITIES.md`). |

Copy `.env.example` to `.env` and fill in only what the project needs. Git ignores `.env`, and every agent is denied reading it.

## What each agent may do

The frontmatter of each file in `.opencode/agents/` is the source of truth; OpenCode enforces it. This table is a summary.

| Agent | Visible | Can edit | Terminal | Can delegate |
|---|---|---|---|---|
| `orchestrator` | yes, the entry point | `docs/PROJECT_BRIEF.md`, `docs/ROADMAP.md`, `docs/PROJECT_STATE.md` | read-only git, `git add`, `git commit`, kickoff setup; push and remote changes **ask you**; history rewrites, force-adds and file deletion blocked | the seven specialists and the read-only `explore`, nothing else |
| `requirements` | hidden | `docs/specs/**` | none | no |
| `architect` | hidden | `docs/architecture/**`, `docs/RUNBOOK.md` | read-only git (`log`, `diff`) | no |
| `ux` | hidden | `docs/ux/**` | none | no |
| `ui` | hidden | `docs/ui/**` | none | no |
| `coder` | hidden | everything except `.env` | everything except staging, committing, pushing, history changes, publishing, deploying and printing `.env` | no |
| `reviewer` | hidden | nothing | read-only git and search; never runs the code | no |
| `tester` | hidden | `tests/**` | same blocks as `coder` | no |

No agent can read `.env`. Terminal rules match command text, so an unusual spelling can slip past them; treat them as a safety net. The rules in each agent's prompt apply either way.

## Process levels

The orchestrator picks the smallest level that fits and says which before it starts. A level only ever goes up.

| Level | Example | What runs | Your approval |
|---|---|---|---|
| Trivial | a typo, a config value | coder only | none |
| Small | one bug fix, one screen, one endpoint | requirements → coder → reviewer → tester | none; it says what it is doing in one line |
| Standard | a feature with several parts or a new dependency | requirements → architect (if structural) → coder → reviewer → tester | go/no-go on the plan |
| Complex | a new product, a stack or data-model change | brief and roadmap first, then each piece as Standard | before the first piece |

Review fix cycles and test-fix cycles are each capped at 3. After that the orchestrator stops and brings you options in plain language.

## Files the swarm writes

| Path | Written by | What it holds |
|---|---|---|
| `docs/PROJECT_BRIEF.md` | orchestrator, with your approval | problem, users, outcome, non-negotiables, success criteria |
| `docs/ROADMAP.md` | orchestrator | ordered pieces and their status; the list changes only with your approval |
| `docs/PROJECT_STATE.md` | orchestrator | decisions, work done, work in progress, open questions, next steps |
| `docs/specs/<task>.md` | requirements | acceptance criteria with stable IDs |
| `docs/architecture/<task>.md` | architect | the design for that task |
| `docs/RUNBOOK.md` | architect | stack, layout, and the one command each to install, run and test |
| `docs/ux/<task>.md`, `docs/ui/<task>.md` | ux, ui | flows and screen definitions |
| `tests/**` | tester | tests mapped to acceptance-criterion IDs |
| everything else | coder | the application |

## Adding a specialist

The base roster covers the full delivery cycle for most projects. Add a specialist **per project**, and only when a capability recurs that the roster cannot handle; the likely case is live operations such as database migrations against real data or background jobs. Not for deployment alone: the architect owns the runbook's deploy entry, the coder writes the config, and you run it.

Three rules for any specialist you add:

1. **Narrow scope:** one capability, described in one sentence. "Devops" is not a capability; "runs database migrations after the human approves" is.
2. **Deploying stays with you.** The agent may prepare, verify and document; a deployment runs only when you act, the same as `git push`.
3. **Never the agent that writes the code.** Keep preparing and writing on separate agents, for the same reason coder and reviewer are separate.

Give it `hidden: true` and `task: deny` like the others, a model in `opencode.json`, and add it to the orchestrator's `task` allow-list.
