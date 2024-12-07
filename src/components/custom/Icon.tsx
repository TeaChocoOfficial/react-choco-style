//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/Icon.tsx"
import * as solids from "@fortawesome/free-solid-svg-icons";
import * as brands from "@fortawesome/free-brands-svg-icons";
import * as regulars from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp as IconPropType } from "@fortawesome/fontawesome-svg-core";

export type TypeIconSolids = keyof typeof solids;
export type TypeIconBrands = keyof typeof brands;
export type TypeIconRegulars = keyof typeof regulars;
export type TypeIcon = TypeIconSolids | TypeIconBrands | TypeIconRegulars;
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
};

export default function Icon({
    fa,
    solid,
    brand,
    regular,
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
    return <FontAwesomeIcon icon={icon as IconPropFa} />;
}
