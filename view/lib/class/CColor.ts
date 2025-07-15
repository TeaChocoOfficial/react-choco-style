//-Path: "react-choco-style/lib/src/theme/color.ts"
import {
    ShadeKey,
    ColorHex,
    ShadeColors,
    ShadeMapCallbackFn,
} from '../types/color';
import * as Chroma from 'chroma.ts';
import { Obj } from '@teachoco-dev/cli';
import { ColorRgba, ChocoColorType } from '../types/chocoColor';

export class CColor {
    private rgba: ColorRgba;
    private static readonly minShade: ShadeKey = 0;
    private static readonly maxShade: ShadeKey = 10;
    constructor(color?: ChocoColorType, alpha?: number) {
        this.rgba = CColor.getRgba(color, alpha);
    }
    set(color?: ChocoColorType, alpha?: number) {
        this.rgba = CColor.getRgba(color, alpha);
        return this;
    }

    hex(color?: ChocoColorType, alpha?: number): ColorHex {
        const rgba =
            color !== undefined ? CColor.getRgba(color, alpha) : this.rgba;
        return CColor.hex(rgba, alpha);
    }

    toString(): ColorHex {
        return this.hex();
    }

    toArray(color?: ChocoColorType): number[] {
        const rgba = color ? CColor.getRgba(color) : this.rgba;
        return [rgba.r, rgba.g, rgba.b, rgba.a];
    }

    lighter(amount = 1, isThis?: boolean) {
        const color = Chroma.color(this.toArray()).brighter(amount);
        if (isThis) {
            this.rgba = CColor.getRgba(color.rgba());
            return this;
        } else {
            return new CColor(color.rgba());
        }
    }

    darker(amount = 1, isThis?: boolean) {
        const color = Chroma.color(this.toArray()).darker(amount);
        if (isThis) {
            this.rgba = CColor.getRgba(color.rgba());
            return this;
        } else {
            return new CColor(color.rgba());
        }
    }

    alpha(amount: number, isThis?: boolean): CColor {
        try {
            if (amount > 1 || amount < 0)
                throw Error(`alpha must be between 0 and 1`);
            if (isThis) {
                this.rgba.a = amount;
                return this;
            } else {
                const newRgba = new ColorRgba(
                    this.rgba.r,
                    this.rgba.g,
                    this.rgba.b,
                    amount,
                );
                const newColor = new CColor(newRgba);
                return newColor;
            }
        } catch (error) {
            console.error(error);
            if (isThis) {
                return this;
            } else {
                return new CColor(this.rgba);
            }
        }
    }

    shades(color?: ChocoColorType, alpha?: number): ShadeColors {
        const rgba =
            color !== undefined ? CColor.getRgba(color, alpha) : this.rgba;
        return CColor.shades(rgba, alpha);
    }

    clone(rgba?: ColorRgba): CColor {
        const Rgba = rgba ?? this.rgba;
        return new CColor(new ColorRgba(Rgba.r, Rgba.g, Rgba.b, Rgba.a));
    }

    static hex(color?: ChocoColorType, alpha?: number): ColorHex {
        try {
            const rgba = CColor.getRgba(color, alpha);
            const chromaColor = Chroma.color([rgba.r, rgba.g, rgba.b, rgba.a]);
            const effectiveAlpha = alpha !== undefined ? alpha : rgba.a;
            return chromaColor.hex(
                effectiveAlpha === 1 ? 'rgb' : 'rgba',
            ) as ColorHex;
        } catch (error) {
            console.error('Invalid color:', error);
            return '#00000000';
        }
    }

    static shades(
        color?: ChocoColorType,
        alpha?: number,
        reverse?: boolean,
    ): ShadeColors;
    static shades(color?: ChocoColorType, reverse?: boolean): ShadeColors;
    static shades(
        color?: ChocoColorType,
        alphaOrReverse?: number | boolean,
        reverse: boolean = false,
    ): ShadeColors {
        let alpha: number | undefined;
        if (alphaOrReverse === true) {
            reverse = true;
        } else {
            alpha = alphaOrReverse as number | undefined;
        }
        const shadeStep: number = 0.5;
        const shades = {} as ShadeColors;
        const rgba = CColor.getRgba(color, alpha);
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
            shades[index] = chocoColor.darker(amount);
        }
        shades.map = <MapCallback>(
            callbackfn: ShadeMapCallbackFn<MapCallback>,
        ): MapCallback[] => {
            if (typeof callbackfn !== 'function') {
                throw new TypeError('callbackfn must be a function');
            }
            return Obj.keys(shades)
                .filter((key) => !isNaN(Number(key)))
                .map((key, index) =>
                    callbackfn(shades[key as ShadeKey], key as ShadeKey, index),
                ) as MapCallback[];
        };
        return shades;
    }

    static getRgba(color?: ChocoColorType, alpha?: number): ColorRgba {
        try {
            if (color === null) return new ColorRgba();
            if (color instanceof ColorRgba)
                return new ColorRgba(
                    color.r,
                    color.g,
                    color.b,
                    alpha ?? color.a,
                );
            if (color instanceof CColor)
                return new ColorRgba(
                    color.rgba.r,
                    color.rgba.g,
                    color.rgba.b,
                    alpha !== undefined ? alpha : color.rgba.a,
                );
            if (typeof color === 'number') {
                let base16 = (color >>> 0).toString(16);
                let hex: string;
                if (base16.length <= 3) {
                    hex = base16.replace(/(.)/g, '$1$1').padStart(6, '0');
                } else {
                    hex = base16.padStart(6, '0').slice(-6);
                }
                color = `#${hex}` as ColorHex;
            }
            const chromaColor = Chroma.color(color ?? '#00000000');
            const [r, g, b] = chromaColor.rgb();
            const effectiveAlpha =
                alpha !== undefined ? alpha : chromaColor.alpha();
            return new ColorRgba(r, g, b, effectiveAlpha);
        } catch (error) {
            console.error('Invalid color:', error);
            return new ColorRgba();
        }
    }

    static from(color?: ChocoColorType, alpha: number = 1): CColor {
        return new CColor(color, alpha);
    }
}

export function newChocoColor(color?: ChocoColorType) {
    return new CColor(color);
}

// console.log(new ChocoColor().toString()); // #00000000
// console.log(CColor.call(0x123)); // #112233
// console.log(CColor.call(0x1234)); // #11223344
// console.log(CColor.call(0x123456)); // #123456
// console.log(new ChocoColor(0x123456).a(0.5).hex()); // #12345678
// console.log(CColor.call(0xffaaee)); // #ffaaee
// console.log(CColor.call(0xffaadecc)); // #ffaadecc
