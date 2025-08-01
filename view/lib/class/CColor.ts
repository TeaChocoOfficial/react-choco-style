//-Path: "react-choco-style/lib/src/class/CColor.ts"
import * as Chroma from 'chroma.ts';
import { ColorHex } from '../types/color';
import { ChocoShade } from './ChocoShade';
import { ColorRgba, ChocoColorType } from '../types/cColor';

export class CColor {
    private _rgba: ColorRgba;
    constructor(color?: ChocoColorType, alpha?: number) {
        this._rgba = CColor.getRgba(color, alpha);
    }
    set(color?: ChocoColorType, alpha?: number) {
        this._rgba = CColor.getRgba(color, alpha);
        return this;
    }
    rgba(rgba?: ColorRgba): ColorRgba {
        if (rgba) this._rgba = rgba;
        return this._rgba;
    }

    hex(color?: ChocoColorType, alpha?: number): ColorHex {
        const rgba =
            color !== undefined ? CColor.getRgba(color, alpha) : this.rgba();
        return CColor.hex(rgba, alpha);
    }

    toString(): ColorHex {
        return this.hex();
    }

    toArray(color?: ChocoColorType): number[] {
        const rgba = color ? CColor.getRgba(color) : this.rgba();
        return [rgba.r, rgba.g, rgba.b, rgba.a];
    }

    lighter(amount = 1, isThis?: boolean) {
        const color = Chroma.color(this.toArray()).brighter(amount);
        if (isThis) {
            this._rgba = CColor.getRgba(color.rgba());
            return this;
        } else {
            return new CColor(color.rgba());
        }
    }

    darker(amount = 1, isThis?: boolean) {
        const color = Chroma.color(this.toArray()).darker(amount);
        if (isThis) {
            this._rgba = CColor.getRgba(color.rgba());
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
                this.rgba().a = amount;
                return this;
            } else {
                const newRgba = new ColorRgba(
                    this.rgba().r,
                    this.rgba().g,
                    this.rgba().b,
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
                return new CColor(this.rgba());
            }
        }
    }

    clone(rgba?: ColorRgba): CColor {
        const Rgba = rgba ?? this.rgba();
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
                    color.rgba().r,
                    color.rgba().g,
                    color.rgba().b,
                    alpha !== undefined ? alpha : color.rgba().a,
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
            const chromaColor = Chroma.color(
                color instanceof ChocoShade
                    ? color.hex()
                    : color ?? '#00000000',
            );
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

// console.log(new ChocoColor().toString()); // #00000000
// console.log(CColor.call(0x123)); // #112233
// console.log(CColor.call(0x1234)); // #11223344
// console.log(CColor.call(0x123456)); // #123456
// console.log(new ChocoColor(0x123456).a(0.5).hex()); // #12345678
// console.log(CColor.call(0xffaaee)); // #ffaaee
// console.log(CColor.call(0xffaadecc)); // #ffaadecc
