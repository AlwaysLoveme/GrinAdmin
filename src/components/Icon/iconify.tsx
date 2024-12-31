import { memo } from "react";
import { Icon, disableCache } from "@iconify/react";

import type { FC } from "react";
import type { IconProps } from "@iconify/react";

const Iconify: FC<IconProps> = ({ icon, size = "1em", className = "", ...other }) => {
  return (
    <div className="anticon">
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={`m-auto ${className}`}
        {...other}
      />
    </div>
  );
};

disableCache("local");
export default memo(Iconify);
