//-Path: "react-choco-style/lib/src/class/ChocoShade.ts"
import {
    ShadeKey,
    ColorHex,
    ShadeColor,
    ShadeMapCallbackFn,
} from '../types/color';
import { CColor } from './CColor';
import { Obj } from '@teachoco-dev/cli';
import { ChocoColorType, ColorRgba } from '../types/cColor';

export class ChocoShade implements ShadeColor {
    0: CColor;
    1: CColor;
    2: CColor;
    3: CColor;
    4: CColor;
    5: CColor;
    6: CColor;
    7: CColor;
    8: CColor;
    9: CColor;
    10: CColor;
    private readonly minShade: ShadeKey = 0;
    private readonly maxShade: ShadeKey = 10;
    constructor(color?: ChocoColorType, alpha?: number, reverse?: boolean);
    constructor(color?: ChocoColorType, reverse?: boolean);
    constructor(
        color?: ChocoColorType,
        alphaOrReverse?: number | boolean,
        reverse: boolean = alphaOrReverse === true ? true : false,
    ) {
        const alpha =
            typeof alphaOrReverse === 'boolean' ? undefined : alphaOrReverse;
        const shadeStep: number = 0.5;
        const rgba = CColor.getRgba(color, alpha); // Static method call
        const mainShade = (this.maxShade * shadeStep) / 2;
        const effectiveAlpha = alpha !== undefined ? alpha : rgba.a;
        for (
            let index: ShadeKey = this.minShade;
            index <= this.maxShade;
            index++
        ) {
            const shade = reverse
                ? mainShade - index * shadeStep
                : -mainShade + index * shadeStep;
            const amount = shade / (mainShade * shadeStep);
            const chocoColor = new CColor(color, effectiveAlpha);
            this[index] = chocoColor.darker(amount);
        }
    }
    get main(): CColor {
        return this[((this.minShade + this.maxShade) / 2) as ShadeKey];
    }
    hex(color?: ChocoColorType, alpha?: number): ColorHex {
        const rgba =
            color !== undefined
                ? CColor.getRgba(color, alpha)
                : this.main.rgba();
        return this.main.hex(rgba, alpha);
    }
    toString(): ColorHex {
        return this.hex();
    }
    toArray(color?: ChocoColorType): number[] {
        const rgba = color ? CColor.getRgba(color) : this.main.rgba();
        return [rgba.r, rgba.g, rgba.b, rgba.a];
    }
    alpha(amount: number, isThis?: boolean): CColor {
        return this.main.alpha(amount, isThis);
    }
    clone(rgba?: ColorRgba): CColor {
        return this.main.clone(rgba);
    }
    map<MapCallback>(
        callbackfn: ShadeMapCallbackFn<MapCallback>,
    ): MapCallback[] {
        if (typeof callbackfn !== 'function') {
            throw new TypeError('callbackfn must be a function');
        }
        return Obj.keys(this)
            .filter((key) => !isNaN(Number(key)))
            .map((key, index) =>
                callbackfn(this[key as ShadeKey], key as ShadeKey, index),
            ) as MapCallback[];
    }
}
