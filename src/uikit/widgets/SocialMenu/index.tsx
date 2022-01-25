import {socials} from "../Menu/config";
import Link from "../../components/Link/Link";
import React from "react";
import * as IconModule from "../Menu/icons";
import {SvgProps} from "../../components/Svg";
import Dropdown from "../../components/Dropdown/Dropdown";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

export default function SocialMenu() {
    return <>
        <div className="socials-menu">
            {socials.map((social: any, index) => {
                const Icon = Icons[social.icon];
                const iconProps = {width: "24px", color: "textSubtle", style: {cursor: "pointer"}};
                const mr = index < socials.length - 1 ? "5px" : 0;
                if (social.items) {
                    return(
                        <Dropdown key={social.label} position="bottom" target={<Icon {...iconProps} mr={mr}/>}>
                            {social.items.map((item) => (
                                <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                                    {item.label}
                                </Link>
                            ))}
                        </Dropdown>
                    )

                    // social.items.map((item) => (
                    //         <Link external key={item.label} href={item.href} aria-label={item.label}
                    //               color="textSubtle">
                    //             {item.label}
                    //         </Link>
                    //     )
                    // );
                }
                return (
                    <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                        <Icon {...iconProps} />
                    </Link>
                );
            })}
        </div>
    </>
}