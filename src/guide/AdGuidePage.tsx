import BaseComponent, { GuideState, SetActionProps } from './BaseComponent'

const AdGuidePage = ({ guideVisible, setGuideVisible }: { guideVisible: boolean; setGuideVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const init: GuideState = {
    steps: [
      {
        id: 1,
        target: '.selectGuide',
        content: (
          <p className="guide-content oneline">
            해당 스페이스에 개설된 시간설정을 확인 할 수
            <p />
            있으며 선택하여 참여 할 수 있습니다.
          </p>
        ),
      },
      {
        id: 2,
        target: '.calenderGuide',
        content: (
          <p className="guide-content oneline">
            클릭 후 드래그하여 범위를 선택하여 해당
            <p />
            시간설정에 대한 정보를 조회 할 수 있습니다.
          </p>
        ),
      },
      {
        id: 3,
        target: ".MuiDataGrid-columnHeader[data-field='출결']",
        content: <p className="guide-content oneline">관리자가 설정한 해당셀의 출결정보를 볼 수 있습니다.</p>,
      },
      {
        id: 4,
        target: ".MuiDataGrid-cell[data-field='출결']",
        content: <p className="guide-content oneline">관리자 : 해당 셀을 더블클릭 후 출결정보를 수정할 수 있습니다.</p>,
      },
      {
        id: 5,
        target: '.MuiDataGrid-virtualScroller',
        content: <p className="guide-content oneline">현재 스페이스에 각 시간설정에 참여한 유저 정보를 표시합니다.</p>,
      },
      {
        id: 6,
        target: '.deleteGuide',
        content: <p className="guide-content oneline">관리자 : 참여한 유저를 삭제할 수 있습니다.</p>,
      },
      {
        id: 7,
        target: '.joinGuide',
        content: <p className="guide-content oneline">좌측 상단에 참여를 원하는 시간설정을 클릭 후 참여할 수 있습니다.</p>,
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

export default AdGuidePage
