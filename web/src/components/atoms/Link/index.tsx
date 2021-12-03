import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as R from "ramda";
import React, { ReactNode, useCallback } from "react";
import { useRecoilValue } from "recoil";

// import { UserSelector } from "recoil/user/state";

export interface LinkProps extends NextLinkProps {
  href: string;
  target?: string;
  children?: ReactNode;
}

const publicOpenedHrefs = ["/", "login", "signup"];

function Link({ target, children, ...props }: LinkProps) {
  const router = useRouter();
  const isLoggedIn = false;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      console.log(props.href);
      const isPublic = R.includes(props.href, publicOpenedHrefs);
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
