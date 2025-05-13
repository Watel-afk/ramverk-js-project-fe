import MUILink, { LinkProps as MUILinkProps } from "@mui/material/Link";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type CombinedLinkProps = MUILinkProps & NextLinkProps;

const Link = React.forwardRef<HTMLAnchorElement, CombinedLinkProps>(
  ({ href, children, ...rest }, ref) => {
    return (
      <MUILink component={NextLink} href={href} ref={ref} {...rest}>
        {children}
      </MUILink>
    );
  }
);

Link.displayName = "Link";

export default Link;
