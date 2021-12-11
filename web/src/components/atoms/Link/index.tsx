import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import * as R from "ramda";
import React, { ReactNode, useCallback } from "react";

// import { UserSelector } from "recoil/user/state";

export interface LinkProps extends NextLinkProps {
  href: string;
  target?: string;
  children?: ReactNode;
}

const publicOpenedHrefs = ["/", "login", "signup"];

function Link({ target, children, ...props }: LinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const isPublic = R.includes(props.href, publicOpenedHrefs);
      const isLoggedIn =
        nookies.get(null).accessToken !== null ||
        nookies.get(null).refreshToken !== null;
      if (!isPublic && !isLoggedIn) {
        e.preventDefault();
        router.push("/login");
      }
    },
    [props.href, router]
  );

  return (
    <NextLink {...props}>
      <a
        href={props.href}
        target={target}
        onClick={handleClick}
        className="w-full h-full flex-center"
      >
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
