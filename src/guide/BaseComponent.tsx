import { useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Joyride, { CallBackProps, Placement } from "react-joyride";
import { defaultOptions } from "../config";

export type GuideState = {
  steps: {
    id: number;
    target: string;
    placement?: Placement | "auto" | "center";
    content: JSX.Element;
  }[];
};

export type WhichGuideState = "adLogGuide" | "adGuide" | "adminGuide";

export type SetActionProps = {
  init: GuideState;
  whichGuide: WhichGuideState;
  guideVisible: boolean;
  setGuideVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BaseComponent = (setAction: SetActionProps) => {
  const [data, setData] = useState<CallBackProps | undefined>();
  const { init, whichGuide, guideVisible, setGuideVisible } = setAction;

  const callbackHandler = (data: CallBackProps | undefined) => {
    if (data?.action === "reset") {
      setGuideVisible(false);
    } else if (data?.action === "close") {
      setGuideVisible(false);
    }
  };

  const startGuide: GuideState["steps"] = [
    {
      id: 0,
      target: ".startGuide",
      content: (
        <>
          <h2 style={{ fontSize: "25px" }}>메뉴별 가이드 시작하기</h2>
          <EmojiEventsIcon sx={{ fontSize: 30, color: "gold", paddingBottom: 0 }} />
        </>
      ),
      placement: "center",
    },
    ...init.steps,
  ];

  switch (whichGuide) {
    case "adLogGuide":
    case "adGuide":
    case "adminGuide":
      callbackHandler(data);
      break;
    default:
      throw new Error(`unknown ${whichGuide}`);
  }

  return (
    <Joyride
      steps={startGuide}
      callback={(data: CallBackProps) => {
        setData(data);
      }}
      styles={{ options: defaultOptions }}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      run={guideVisible}
      disableOverlayClose={true}
      locale={{ skip: "SKIP", back: "뒤로", close: "닫기", next: "다음", last: "마침" }}
    />
  );
};

export default BaseComponent;
