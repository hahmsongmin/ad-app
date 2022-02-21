import { useState } from "react";
import Joyride from "react-joyride";
import { defaultOptions } from "../config";

type GuideState = {
  steps: {
    id: number;
    target: string;
    content: string;
  }[];
};

const AdGuidePage = () => {
  const init: GuideState = {
    steps: [
      {
        id: 0,
        target: ".selectGuide",
        content: "해당 스페이스에 개설된 시간설정을 확인 및 선택 할 수 있습니다.",
      },
      {
        id: 1,
        target: ".calenderGuide",
        content: "클릭 후 드래그하여 범위를 선택하여 해당 시간설정에 대한 정보를 조회 할 수 있습니다.",
      },
      {
        id: 2,
        target: ".MuiDataGrid-columnHeader[data-field='출결']",
        content: "관리자가 설정한 해당셀의 출결정보를 볼 수 있습니다.",
      },
      {
        id: 3,
        target: ".MuiDataGrid-cell[data-field='출결']",
        content: "관리자 : 해당 셀을 더블클릭 후 출결정보를 수정할 수 있습니다.",
      },
      {
        id: 4,
        target: ".MuiDataGrid-virtualScroller",
        content: "현재 스페이스에 각 시간설정에 참여한 유저 정보를 표시합니다.",
      },
      {
        id: 5,
        target: ".deleteGuide",
        content: "관리자 : 참여한 유저를 삭제할 수 있습니다.",
      },
      {
        id: 6,
        target: ".joinGuide",
        content: "좌측 상단에 참여를 원하는 시간설정을 클릭 후 참여할 수 있습니다.",
      },
    ],
  };

  const [state, setState] = useState<GuideState>(init);

  return (
    <div>
      <Joyride
        callback={() => null}
        steps={state.steps}
        styles={{ options: defaultOptions }}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        run={true}
        locale={{ back: "뒤로", close: "닫기" }}
      />
    </div>
  );
};

export default AdGuidePage;
