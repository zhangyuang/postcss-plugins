# Changes to PostCSS Nesting

### 10.1.7 (May 20, 2022)

- Add tentative support for `@layer`. The actual behavior is poorly defined and may change in the future. Use with caution.

### 10.1.6 (May 17, 2022)

 - Fix selector order with `:before` and other pseudo elements.

### 10.1.5 (May 11, 2022)

- Use `@csstools/selector-specificity` for specificity calculations.

### 10.1.4 (April 4, 2022)

- Improved : compound selector order with pseudo elements
- Improved : selector specificity calculation.

### 10.1.3 (March 4, 2022)

- Avoid creating duplicate selectors containing only comments.

```diff
.alpha {
	/* loose comment */
	& .beta {
		order: 1;
	}
}

/* becomes */

- .alpha {
-   /* loose comment */
- }
+ /* loose comment */
.alpha .beta {
	order: 1;
}
```

### 10.1.2 (January 12, 2022)

- Improved : selector specificity calculation

### 10.1.1 (January 2, 2022)

- Removed Sourcemaps from package tarball.
- Moved CLI to CLI Package. See [announcement](https://github.com/csstools/postcss-plugins/discussions/121).

### 10.1.0 (December 22, 2021)

- Added: `noIsPseudoSelector` plugin option.
- Changed: `:is()` pseudo is now avoided as much as possible by default.
- Updated: documentation

[more info on noIsPseudoSelector](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting#noispseudoselector)

```js
postcssNesting({
	noIsPseudoSelector: true
})
```

### 10.0.3 (December 13, 2021)

- Updated: documentation

### 10.0.2 (November 18, 2021)

- Fixed: Support for Deno. Ensuring we pack `mod.js` so it can be accessible by CDNs.

### 10.0.1 (November 17, 2021)

- Removed: Support for `allowDeclarationsAfterNestedRules`.

We've realised that enforcing this rule from the spec was going to be problematic
in the long run given how plugins work and the whole ecosystem around mixins and
other features. Treating this as a patch given that this was introduced in the
previous version and was starting to break projects that were using other features.

### 10.0.0 (November 16, 2021)

- Added: Support for `allowDeclarationsAfterNestedRules` to deviate from spec.
- Added: `.npmrc` file.

- Updated: Aligning completely with the [spec](https://www.w3.org/TR/css-nesting-1/) updates.
- Updated: `esbuild` to 0.13.12 (minor)

- Removed: Support for PostCSS 7

### 9.0.0 (October 27, 2021)

- Added: Support for Deno
- Fixed: Issue with PostCSS 8 compatibility using the RuleExit listener

### 8.0.1 (May 1, 2021)

- Fixed: Compatibility issue with CommonJS.

### 8.0.0 (April 26, 2021)

- Updated: Support for PostCSS 8+.
- Updated: Support for Node v12+.
- Updated: Support for the `@container` at-rule.

### 7.0.1 (July 29, 2018)

- Fixed: Non-breaking issue with rules being unnecessarily split

### 7.0.0 (September 17, 2018)

- Updated: Support for PostCSS v7+
- Updated: Support for Node v6+

In a comment, a CSSWG member expressed interest in handling nested `@media`
while handling selector nesting. Since the specification has yet to be added
to the official CSSWG repository, nested at-rule deprecation is further delayed.

### 6.0.0 (June 9, 2018)

- Deprecated: Nested at-rules like `@media` will no longer work in 7.0.0
- Refactored code to improve efficiency

### 5.0.0 (March 24, 2018)

- Refactored code to use Imports babel-transformed for Node v4 compatibility

### 4.2.1 (September 19, 2017)

- Updated: Exposing the transform function as its own for postcss-extend

### 4.2.0 (September 18, 2017)

- Added: Reduced splitting of rules

### 4.1.0 (August 19, 2017)

- Added: Mutation-safe walk method
- Improved: Complex selector validity testing
- Thanks: A special thanks to @JLHwung for these improvements

### 4.0.1 (May 22, 2017)

- Improved: Selector validity testing

### 4.0.0 (May 20, 2017)

- Changed: Transform only compliant nesting
- Added: Preserve more raws formatting

### 3.0.0 (May 8, 2017)

- Added: Node 4.x support
- Added: PostCSS 6 support
- Added: Preserved ordering
- Removed: Node 0.12 support

### 2.3.1 (March 16, 2016)

- Updated: Allow any direct nesting that follows the syntactic constraints
- Updated: PostCSS 5.0.6
- Updated: Tests
- Updated: Dependencies
- Updated: Project configuration

### 2.3.0 (February 20, 2016)

- Updated: JavaScript formatting, linting, tests, and documentation
- Updated: Properly concatenate at-rules with or expressions
- Updated: Update internal plugin name to postcss-nesting

### 2.2.0 (January 30, 2016)

- Added: Nesting of all at-rules
- Updated: Direct nesting order maintains order
- Updated: Tests and documentation

### 2.1.1 (January 3, 2016)

- Updated: Project conventions

### 2.1.0 (January 3, 2016)

- Added: Support for valid direct nesting

### 2.0.6 (October 15, 2015)

- Fixed: Issue with new PostCSS rules

### 2.0.5 (October 12, 2015)

- Updated: Nested rules source map to the parent rule
- Updated: PostCSS 5.0.9
- Updated: Tests and documentation
- Updated: Project configuration

### 2.0.4 (September 23, 2015)

- Updated: Map source raws

### 2.0.3 (September 22, 2015)

- Updated: Refactored plugin
- Updated: Tests
- Updated: PostCSS 5.0.6

### 2.0.2 (September 16, 2015)

- Fixed: Issue where the new rule’s children were not mapped to the parent internally

### 2.0.1 (September 16, 2015)

- Fixed: Issue where  a `@nest` rule followed by another bubbling at-rule would not bubble
- Added: CONTRIBUTING.md

### 2.0.0 (September 16, 2015)

- Added: Requirement of `&` per the specification
- Added: New prefix option
- Added: `@document` and `@supports` as bubbles
- Updated: Documentation

### 1.0.0 (September 15, 2015)

- Added: New `@nest` at-rule syntax
- Updated: PostCSS 5
- Removed: Old inner bracket syntax

### 0.1.0 (June 17, 2015)

- Added: Initial release
