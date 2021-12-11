import NotiResult from "@components/organisms/NotiResult";
import BackgroundTemplate from "@components/templates/BackgroundTemplate";
import React, { FC, useState } from "react";

interface NotiViewProps {}

const NotiView: FC<NotiViewProps> = () => {
  return (
    <BackgroundTemplate title="알림 내역">
      <NotiResult></NotiResult>
    </BackgroundTemplate>
  );
};

export default NotiView;
