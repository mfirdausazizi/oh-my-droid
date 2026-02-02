---
name: release
description: Use when user needs automated release workflow with version bump and publishing
---

# Release Skill

Automate the release process with version bump, testing, and publishing.

## Usage

```
/omd-release <version>
/omd-release patch
/omd-release minor
/omd-release major
```

## Release Checklist

### 1. Version Bump
Update version in all locations:
- `package.json`
- Version constants in source
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
gh release create v<version> --title "v<version>" --notes "<notes>"
```

### 7. Verify
- npm package published
- GitHub release created
- Tag pushed

## Semantic Versioning

- **patch** (X.Y.Z+1): Bug fixes
- **minor** (X.Y+1.0): New features, backward compatible
- **major** (X+1.0.0): Breaking changes
