import Footer from "@components/organisms/Footer";
import React, { FC, ReactNode } from "react";

interface BackgroundTemplateProps {
  children?: ReactNode;
  title?: string;
}

const BackgroundTemplate: FC<BackgroundTemplateProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full h-full relative p-5">
        <div className="text-xl font-semibold text-left">{title}</div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default BackgroundTemplate;
