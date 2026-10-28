# Changelog

## 1.0.0

First public release.

- One visible orchestrator and seven hidden specialists (requirements, architect, UX, UI, coder, reviewer, tester) for OpenCode.
- Process levels (Trivial, Small, Standard, Complex) chosen before work starts; your go/no-go on Standard and Complex work only.
- Acceptance criteria with stable IDs, traced through the coder's coverage report, the reviewer's verdicts and the tester's tests.
- Review and test fix cycles capped at 3 each, then plain-language options instead of another loop.
- Permissions enforced in each agent's frontmatter: every agent except the coder edits only its own folder, no agent reads `.env`, pushing asks you, history rewrites and file deletion are blocked.
- Project memory in three files (brief, roadmap, state) read at every session start.
- Every agent's model set in one block of `opencode.json`, grouped into three tiers.
- `scripts/verify-claims.mjs`: 21 checks that the docs match the files and that nothing private is in the tree, run on every push.
