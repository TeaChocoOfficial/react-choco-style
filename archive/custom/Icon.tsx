//-Path: "react-choco-style/src/custom/Icon.tsx"
import { Obj } from '@teachoco-dev/cli';
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import * as solids from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regulars from '@fortawesome/free-regular-svg-icons';
import { IconProp as IconPropType } from '@fortawesome/fontawesome-svg-core';

export type TypeIconSolids = keyof typeof solids;
export type TypeIconBrands = keyof typeof brands;
export type TypeIconRegulars = keyof typeof regulars;
export const typeIconSolids: TypeIconSolids[] = Obj.keys(solids);
export const typeIconBrands: TypeIconBrands[] = Obj.keys(brands);
export const typeIconRegulars: TypeIconRegulars[] = Obj.keys(regulars);
export type TypeIcon = TypeIconSolids | TypeIconBrands | TypeIconRegulars;
export const typeIcons: TypeIcon[] = [
    ...typeIconSolids,
    ...typeIconBrands,
    ...typeIconRegulars,
];
export type IconProps = Omit<FontAwesomeIconProps, 'icon'>;
export type IconPropFa = IconPropType;
export type TypeSolids =
    | solids.IconDefinition
    | solids.IconPrefix
    | solids.IconPack
    | regulars.IconDefinition
    | regulars.IconPrefix
    | regulars.IconPack;
export type IconProp = {
    fa?: TypeIcon;
    solid?: TypeIconSolids;
    brand?: TypeIconBrands;
    regular?: TypeIconRegulars;
    props?: IconProps;
};

export function Icon({
    fa,
    solid,
    brand,
    regular,
    props,
}: IconProp): React.ReactNode {
    let icon: TypeSolids | undefined;

    if (solid) {
        icon = solids[solid];
    } else if (regular) {
        icon = regulars[regular];
    } else if (brand) {
        icon = brands[brand];
    } else if (fa) {
        const brandfa = brands[fa as TypeIconBrands];
        if (brandfa) {
            icon = brandfa;
        }
        const regularfa = regulars[fa as TypeIconRegulars];
        if (regularfa) {
            icon = regularfa;
        }
        const solidfa = solids[fa as TypeIconSolids];
        if (solidfa) {
            icon = solidfa;
        }
    }
    return <FontAwesomeIcon {...props} icon={icon as IconPropFa} />;
}

// pnpm i @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core
