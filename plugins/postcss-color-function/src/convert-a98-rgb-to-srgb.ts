import { gam_sRGB, lin_a98rgb, lin_a98rgb_to_XYZ, lin_sRGB, lin_sRGB_to_XYZ, OKLab_to_OKLCH, OKLab_to_XYZ, OKLCH_to_OKLab, XYZ_to_lin_sRGB, XYZ_to_OKLab } from './css-color-4/conversions.js';
import { clip, inGamut, mapGamut } from './css-color-4/map-gamut';

type color = [number, number, number];

export function a98RgbToSRgb(a98: color): color {
	let conversion = a98.slice() as color;

	// https://www.w3.org/TR/css-color-4/#predefined-to-predefined
	// https://www.w3.org/TR/css-color-4/#predefined-to-lab-oklab
	conversion = lin_a98rgb(conversion);
	conversion = lin_a98rgb_to_XYZ(conversion);

	let oklch = conversion.slice() as color;
	oklch = XYZ_to_OKLab(oklch);
	oklch = OKLab_to_OKLCH(oklch);

	// 3. Convert from(D65 - adapted) CIE XYZ to linear RGB
	conversion = XYZ_to_lin_sRGB(conversion);
	// 4. Convert from linear - light RGB to RGB(do gamma encoding)
	conversion = gam_sRGB(conversion);

	if (inGamut(conversion)) {
		return clip(conversion);
	}

	return mapGamut(oklch, (x: color) => {
		x = OKLCH_to_OKLab(x);
		x = OKLab_to_XYZ(x);
		x = XYZ_to_lin_sRGB(x);
		return gam_sRGB(x);
	}, (x: color) => {
		x = lin_sRGB(x);
		x = lin_sRGB_to_XYZ(x);
		x = XYZ_to_OKLab(x);
		return OKLab_to_OKLCH(x);
	});
}
