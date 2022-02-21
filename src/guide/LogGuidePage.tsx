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

const LogGuidePage = () => {
  const init: GuideState = {
    steps: [
      {
        id: 0,
        target: ".filterGuide",
        content: "제목별 필터 검색을 할 수 있습니다.",
      },
      {
        id: 1,
        target: ".modeGuide",
        content: "정보를 표시하는 테이블 모드를 변경할 수 있습니다.",
      },
      {
        id: 2,
        target: ".moaview",
        content: "개수를 정의해서 볼 수 있습니다.",
      },
      {
        id: 3,
        target: ".exitGuide",
        content: "현재 보고 있는 정보를 엑셀로 내보냅니다.",
      },
      {
        id: 4,
        target: ".MuiDataGrid-columnHeadersInner",
        content: "제목 클릭시 빠르게 정렬할 수 있으며 각 메뉴를 통해 관리 할 수 있습니다.",
      },
      {
        id: 5,
        target: ".MuiDataGrid-cell",
        content: "클릭 시 좌측하단의 선택된 총 인원수를 볼 수 있습니다.",
      },
      {
        id: 6,
        target: ".MuiDataGrid-virtualScroller",
        content: "현재 스페이스에 접속했던 유저 및 접속 중인 유저들의 정보를 표시합니다.",
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

export default LogGuidePage;
