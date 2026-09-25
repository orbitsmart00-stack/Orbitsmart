# Orbitsmart

## Superpowers

This repository has [Superpowers](https://github.com/obra/superpowers) (by Jesse Vincent) installed, a skills framework and software development methodology for Claude Code.

Installation is split across two mechanisms so it works in every session type:

### 1. Plugin marketplace (`.claude/settings.json`)

Registers the `obra/superpowers-marketplace` marketplace and enables the `superpowers` plugin at the project level:

```json
{
  "extraKnownMarketplaces": {
    "superpowers-marketplace": {
      "source": { "source": "github", "repo": "obra/superpowers-marketplace" }
    }
  },
  "enabledPlugins": {
    "superpowers@superpowers-marketplace": true
  }
}
```

This activates automatically for anyone who clones the repo and opens it in the Claude Code CLI or desktop app.

**Limitation:** cloud sessions (claude.ai/code) don't resolve plugin marketplaces, so this config alone has no effect there.

### 2. Vendored skill files (`.claude/skills/`)

To make the skills work in *any* session, including the cloud, the actual skill files are copied directly into the repo (skills are read straight off disk, with no marketplace resolution needed):

- `brainstorming`
- `diagnosing-superpowers`
- `dispatching-parallel-agents`
- `executing-plans`
- `finishing-a-development-branch`
- `receiving-code-review`
- `requesting-code-review`
- `subagent-driven-development`
- `systematic-debugging`
- `test-driven-development`
- `using-git-worktrees`
- `using-superpowers`
- `verification-before-completion`
- `writing-plans`
- `writing-skills`

Vendored under the original MIT license — see [`.claude/skills/LICENSE-superpowers`](.claude/skills/LICENSE-superpowers).
