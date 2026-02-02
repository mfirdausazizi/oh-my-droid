---
description: Automated release workflow with version bump and publishing
argument-hint: <version|patch|minor|major>
---

# Release

Automate the release process for the project.

## Usage

```
/omd-release <version>
```

Example: `/omd-release 2.4.0` or `/omd-release patch` or `/omd-release minor`

## Version

$ARGUMENTS

## Release Checklist

Execute these steps in order:

### 1. Version Bump
Update version in all locations:
- `package.json`
- Any version constants in source
- Plugin manifest if applicable
- README.md version references

### 2. Run Tests
```bash
npm run test:run
```
All tests must pass before proceeding.

### 3. Commit Version Bump
```bash
git add -A
git commit -m "chore: Bump version to <version>"
```

### 4. Create & Push Tag
```bash
git tag v<version>
git push origin main
git push origin v<version>
```

### 5. Publish to npm
```bash
npm publish --access public
```

### 6. Create GitHub Release
```bash
gh release create v<version> --title "v<version>" --notes "<release notes>"
```

### 7. Verify
- npm package published
- GitHub release created
- Tag pushed

## Semantic Versioning

- **patch** (X.Y.Z+1): Bug fixes, minor improvements
- **minor** (X.Y+1.0): New features, backward compatible
- **major** (X+1.0.0): Breaking changes
