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
      <div className="max-w-screen-lg h-full bg-white dark:bg-gray-800 relative">
        <div className="mt-4 text-lg font-semibold">{title}</div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default BackgroundTemplate;
