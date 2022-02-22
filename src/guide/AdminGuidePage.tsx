import React from "react";
import Joyride, { CallBackProps } from "react-joyride";
import { defaultOptions } from "../config";

type GuideState = {
  steps: {
    id: number;
    target: string;
    content: string;
  }[];
};

const AdminGuidePage = ({
  guideVisible,
  setGuideVisible,
}: {
  guideVisible: boolean;
  setGuideVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const init: GuideState = {
    steps: [
      {
        id: 0,
        target: ".adminAddGuide",
        content: "시간 설정을 추가 할 수 있습니다.",
      },
      {
        id: 1,
        target: ".adminDeleteGuide",
        content:
          "해당 체크박스 클릭 후 삭제 버튼으로 삭제할 수 있습니다. 알림 : 해당 시간설정에 유저가 참여하고 있다면 출석부에서 해당시간설정에 유저를 전부 삭제후 시간설정을 삭제 할 수 있습니다.",
      },
      {
        id: 2,
        target: ".MuiDataGrid-virtualScroller",
        content: "현재 스페이스에 개설된 시간설정을 표시합니다.",
      },
    ],
  };

  return (
    <div>
      <Joyride
        callback={(data: CallBackProps) => {
          if (data.action === "reset") setGuideVisible(false);
        }}
        getHelpers={(helper) => console.log(helper)}
        steps={init.steps}
        styles={{ options: defaultOptions }}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        run={guideVisible}
        locale={{ back: "뒤로", close: "닫기" }}
      />
    </div>
  );
};

export default AdminGuidePage;
