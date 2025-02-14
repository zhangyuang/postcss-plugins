import parser from 'postcss-selector-parser';
import { sortCompoundSelectorsInsideComplexSelector } from './compound-selector-order';

const linkAST = parser().astSync(':link').nodes[0];
const visitedAST = parser().astSync(':visited').nodes[0];
const areaHrefAST = parser().astSync('area[href]').nodes[0];
const hrefAST = parser().astSync('[href]').nodes[0];

export function replaceAnyLink(rule, result, preserve, areaHrefNeedsFixing) {
	let updatedSelectors = [];
	let untouchedSelectors = [];

	try {
		for (let i = 0; i < rule.selectors.length; i++) {
			const selector = rule.selectors[i];

			const updated = modifiedSelector(selector, areaHrefNeedsFixing);
			if (updated.length) {
				updatedSelectors.push(...updated);
			} else {
				untouchedSelectors.push(selector);
			}
		}
	} catch (_) {
		rule.warn(result, `Failed to parse selector : ${rule.selector}`);
		return;
	}

	if (!updatedSelectors.length) {
		return;
	}

	rule.cloneBefore({
		selectors: updatedSelectors,
	});

	if (preserve) {
		if (untouchedSelectors.length) {
			rule.cloneBefore({
				selectors: untouchedSelectors,
			});
		}
	} else {
		if (untouchedSelectors.length) {
			rule.selectors = untouchedSelectors;
		} else {
			rule.remove();
		}
	}
}

function modifiedSelector(selector, areaHrefNeedsFixing) {
	let out = [];

	// update the selector
	parser((selectorsAST) => {
		let replacements = [];
		selectorsAST.walkPseudos((pseudo) => {
			if (pseudo.value !== ':any-link' || (pseudo.nodes && pseudo.nodes.length)) {
				return;
			}

			if (!areaHrefNeedsFixing) {
				replacements.push([linkAST.clone(), visitedAST.clone()]);
				return;
			}

			const tags = getTagElementsNextToPseudo(pseudo);
			if (tags.includes('area')) {
				replacements.push([linkAST.clone(), visitedAST.clone(), hrefAST.clone()]);
				return;
			}

			if (tags.length) {
				replacements.push([linkAST.clone(), visitedAST.clone()]);
				return;
			}

			replacements.push([linkAST.clone(), visitedAST.clone(), areaHrefAST.clone()]);
		});

		if (!replacements.length) {
			return;
		}

		let replacementsCartesianProduct = cartesianProduct(...replacements);

		replacementsCartesianProduct.forEach((replacement) => {
			const clone = selectorsAST.clone();
			clone.walkPseudos((pseudo) => {
				if (pseudo.value !== ':any-link' || (pseudo.nodes && pseudo.nodes.length)) {
					return;
				}

				pseudo.replaceWith(...replacement.shift().nodes);
			});

			clone.walk((node) => {
				if ('nodes' in node) {
					node.nodes.forEach((child) => {
						sortCompoundSelectorsInsideComplexSelector(child);
					});
					sortCompoundSelectorsInsideComplexSelector(node);
				}
			});

			out.push(clone.toString());
		});
	}).processSync(selector);

	return out;
}

function cartesianProduct(...args) {
	const r = [];
	const max = args.length - 1;

	function helper(arr, i) {
		for (let j = 0, l = args[i].length; j < l; j++) {
			const a = arr.slice(0);
			a.push(args[i][j]);
			if (i == max) {
				r.push(a);
			} else {
				helper(a, i + 1);
			}
		}
	}
	helper([], 0);
	return r;
}

function getTagElementsNextToPseudo(pseudo) {
	let tags = [];

	let prev = pseudo.prev();
	while (prev) {
		if (prev.type === 'combinator') {
			break;
		}

		if (prev.type === 'tag') {
			tags.push(prev.value);
		}

		prev = prev.prev();
	}

	let next = pseudo.next();
	while (next) {
		if (next.type === 'combinator') {
			break;
		}

		if (next.type === 'tag') {
			tags.push(next.value);
		}

		next = next.next();
	}

	return tags;
}
