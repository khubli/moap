# Contributing to MOAP

Thanks for helping. MOAP is plain Markdown and JSON, so most changes are to prompts, permissions or docs.

## Check your change

```sh
node scripts/verify-claims.mjs
```

It needs Node 18 or later and nothing else. It runs the same 21 checks as CI: the roster, the permissions shape, the model block, the claims the README makes, and that no tracked file holds a secret, an email address or a word from your private list.

To guard your own details, copy `.private-words.example` to `.private-words` (git ignores it) and list your name, employers or clients, one per line.

## Where things live

| Path | What |
|---|---|
| `.opencode/agents/<name>.md` | One agent: permissions in the frontmatter (enforced by OpenCode), behaviour in the body |
| `opencode.json` | Default agent and every agent's model |
| `AGENTS.md` | The rules every agent follows; a summary of permissions for orientation |
| `docs/PROJECT_BRIEF.md`, `docs/ROADMAP.md`, `docs/PROJECT_STATE.md`, `docs/CAPABILITIES.md` | The blank project-memory files a new project starts from |
| `docs/setup.md`, `docs/how-it-works.md`, `docs/configuration.md` | MOAP's own docs |
| `docs/images/how-it-works.html` | Source of the overview image; re-render it when stage names change |
| `scripts/verify-claims.mjs` | The claims check |

## Changing an agent

- Permissions go in the frontmatter, never only in prose. In OpenCode the **last** matching rule wins, so put the catch-all `"*"` first and the exceptions after it.
- Keep `AGENTS.md` and `docs/configuration.md` in step with the frontmatter. The frontmatter is the source of truth.
- A new specialist needs `hidden: true`, `task: deny`, a model in `opencode.json`, and an entry in the orchestrator's `task` allow-list. Update the specialist count in the README and `AGENTS.md`; the claims check will tell you if you miss one.
- Test a permission change in a real OpenCode session as well: say in the pull request what you tried and what happened.

## Pull requests

One topic per pull request, with a plain description of the behaviour it changes and why. The checks must pass. Changes are reviewed before merging.
