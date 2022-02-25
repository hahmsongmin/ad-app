import React from 'react'
import BaseComponent, { GuideState, SetActionProps } from './BaseComponent'

const AdminGuidePage = ({ guideVisible, setGuideVisible }: { guideVisible: boolean; setGuideVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const init: GuideState = {
    steps: [
      {
        id: 1,
        target: '.adminAddGuide',
        content: <p className="guide-content oneline">시간 설정을 추가 할 수 있습니다.</p>,
      },
      {
        id: 2,
        target: '.adminDeleteGuide',
        content: (
          <p className="guide-content">
            체크박스 클릭 후 삭제 버튼으로 삭제할 수 있습니다.
            <p />
            만약 해당 시간설정에 유저가 참여하고 있다면 출석부에서 해당시간설정에 유저를 전부 삭제후 시간설정을 삭제 할 수 있습니다.
          </p>
        ),
      },
      {
        id: 3,
        target: '.MuiDataGrid-virtualScroller',
        content: <p className="guide-content oneline">스페이스에 개설된 시간설정을 표시합니다.</p>,
      },
      {
        id: 4,
        target: ".MuiDataGrid-row[data-rowindex='0']",
        content: (
          <p className="guide-content">
            색상있는 셀들은 더블클릭하여 수정할 수 있으며
            <p />
            수정 후 우측 저장버튼을 클릭하여 완료할 수 있습니다.
          </p>
        ),
      },
    ],
  }

  const setAction: SetActionProps = {
    init,
    whichGuide: 'adminGuide',
    guideVisible,
    setGuideVisible,
  }

  return <div>{setAction && <BaseComponent {...setAction} />}</div>
}

export default AdminGuidePage
