# Security

## Reporting a problem

Please report security issues privately through GitHub: on this repository, open **Security → Report a vulnerability**. Don't open a public issue.

Useful reports for MOAP are usually about the agent permissions: a way for an agent to read `.env`, edit outside its folder, push, deploy, rewrite history or delete files without the human, or for a specialist to delegate work.

## How MOAP keeps a project's data private

MOAP runs nothing itself and sends nothing anywhere. It is a set of files that tell OpenCode what each agent may do. What leaves your machine is decided by OpenCode and the model provider you configure: the files an agent reads are sent to that provider as part of its prompt.

- Secrets belong in `.env`, which git ignores and every agent is denied reading. `.env.example` lists key names only.
- Pushing to a remote always asks you. Nothing is published or deployed by an agent.
- Terminal rules match command text, so they are a safety net rather than a sandbox. Don't keep secrets anywhere else in the project folder.

## Supported versions

The latest release on the `v1` line.
