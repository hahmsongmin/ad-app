import BaseComponent, { GuideState, SetActionProps } from './BaseComponent'

const LogGuidePage = ({ guideVisible, setGuideVisible }: { guideVisible: boolean; setGuideVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const init: GuideState = {
    steps: [
      {
        id: 1,
        target: '.moaview',
        content: (
          <p className="guide-content oneline">
            개수를 정의해서 볼 수 있습니다. <p />
            기본값은 25개씩 입니다.
          </p>
        ),
      },
      {
        id: 2,
        target: '.filterGuide',
        content: <p className="guide-content oneline">제목별 필터 검색을 할 수 있습니다.</p>,
      },
      {
        id: 3,
        target: '.modeGuide',
        content: <p className="guide-content oneline">테이블 모드를 변경할 수 있습니다.</p>,
      },
      {
        id: 4,
        target: '.exitGuide',
        content: <p className="guide-content oneline">현재 보고 있는 정보를 엑셀로 내보냅니다.</p>,
      },
      {
        id: 5,
        target: '.MuiDataGrid-columnHeadersInner',
        content: (
          <p className="guide-content oneline">
            제목 클릭으로 빠르게 정렬할 수 있으며
            <p />각 메뉴를 통해 별도 관리 할 수 있습니다.
          </p>
        ),
      },
      {
        id: 6,
        target: '.MuiDataGrid-columnHeaderTitleContainer',
        content: <p className="guide-content">클릭 시 좌측하단의 선택된 총 인원수를 볼 수 있습니다.</p>,
      },
      {
        id: 7,
        target: '.MuiDataGrid-virtualScroller',
        content: (
          <p className="guide-content oneline">
            현재 스페이스에 접속했었던 유저 및 현재
            <p />
            접속 중인 유저들의 전체 정보를 표시합니다.
          </p>
        ),
      },
    ],
  }

  const setAction: SetActionProps = {
    init,
    whichGuide: 'adLogGuide',
    guideVisible,
    setGuideVisible,
  }
  return <div>{setAction && <BaseComponent {...setAction} />}</div>
}

export default LogGuidePage
