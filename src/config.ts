import { styled } from '@mui/material/styles'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
interface GridLocaleText {
  //
  toolbarExport: React.ReactNode
  toolbarExportLabel: string
  toolbarExportCSV: React.ReactNode
  toolbarExportPrint: React.ReactNode
  //
  toolbarFilters: React.ReactNode
  toolbarDensity: React.ReactNode
  toolbarDensityLabel: string
  toolbarDensityCompact: string
  toolbarDensityStandard: string
  toolbarDensityComfortable: string
  toolbarFiltersLabel: string
  //
  noRowsLabel: string
  noResultsOverlayLabel: string
  //
  checkboxSelectionHeaderName: string
  //
  columnMenuShowColumns: React.ReactNode
  columnMenuFilter: React.ReactNode
  columnMenuHideColumn: React.ReactNode
  columnMenuUnsort: React.ReactNode
  columnMenuSortAsc: React.ReactNode
  columnMenuSortDesc: React.ReactNode
  columnsPanelTextFieldLabel: string
  columnsPanelTextFieldPlaceholder: string
  columnsPanelShowAllButton: React.ReactNode
  columnsPanelHideAllButton: React.ReactNode
  //
  filterPanelColumns: React.ReactNode
  filterPanelOperators: React.ReactNode
  filterPanelInputLabel: string
  filterPanelInputPlaceholder: string
  filterOperatorContains: string
  filterOperatorEquals: string
  filterOperatorStartsWith: string
  filterOperatorEndsWith: string
  filterOperatorIsEmpty: string
  filterOperatorIsNotEmpty: string
  filterOperatorIs: string
  filterOperatorNot: string
  filterOperatorIsAnyOf: string
  isClickEdit: boolean
  isClickAd: boolean
  //
  footerRowSelected: (count: number) => React.ReactNode
}

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  //
  toolbarExport: '내보내기',
  toolbarExportLabel: '내보내기',
  toolbarExportCSV: '엑셀 다운로드',
  toolbarExportPrint: '프린트',
  //
  toolbarFilters: '필터',
  toolbarDensity: '모드',
  toolbarDensityLabel: '모드',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',
  toolbarFiltersLabel: '필터',
  //
  noRowsLabel: '정보없음',
  noResultsOverlayLabel: '필터 결과 없음',
  //
  checkboxSelectionHeaderName: '체크박스',
  //
  columnMenuUnsort: '정렬안함',
  columnMenuSortAsc: '오름차순',
  columnMenuSortDesc: '내림차순',
  columnMenuFilter: '필터',
  columnMenuHideColumn: '숨기기',
  columnMenuShowColumns: '관리',
  columnsPanelTextFieldLabel: '찾기',
  columnsPanelTextFieldPlaceholder: '제목',
  columnsPanelShowAllButton: '모두 보이기',
  columnsPanelHideAllButton: '모두 숨기기',
  //
  filterPanelColumns: '제목',
  filterPanelOperators: '연산자',
  filterPanelInputLabel: '입력',
  filterPanelInputPlaceholder: '찾을 값',
  filterOperatorContains: '포함',
  filterOperatorEquals: '동일',
  filterOperatorStartsWith: '시작',
  filterOperatorEndsWith: '끝',
  filterOperatorIsEmpty: '비어있음',
  filterOperatorIsNotEmpty: '비어있지않음',
  filterOperatorIs: '=',
  filterOperatorNot: '!=',
  filterOperatorIsAnyOf: '멀티검색',
  //

  isClickEdit: false,
  isClickAd: false,
  footerRowSelected: (count) => {
    const ok: boolean = GRID_DEFAULT_LOCALE_TEXT.isClickEdit
    if (ok === false) {
      return `총 ${count.toLocaleString()} 명`
    } else {
      return `총 ${count.toLocaleString()} 개`
    }
  },
}

// styles =>

// DataList

export const DataListBox = {
  display: 'flex',
  backgroundColor: 'inherit',
  height: 590,
  width: '100%',
  borderRadius: 10,
  margin: '0 auto',
  '& .MuiDataGrid-cell--editable': {
    bgcolor: 'rgba(217,243,190,0.5)',
  },
}

export const FormControlStyle = {
  zIndex: 10,
  m: 1,
  minWidth: 100,
  position: 'absolute',
  transform: 'translate(-3px, -13px)',
}

export const InputLabelStyle = {
  color: 'white',
  fontSize: 14,
}

export const SelectStyle = {
  height: 50,
}

// columns =>
export const LogColumns = [
  { field: '닉네임', type: 'string', width: 200 },
  { field: '날짜', type: 'string', width: 155 },
  { field: '입장', type: 'string', width: 145 },
  { field: '퇴장', type: 'string', width: 145 },
  { field: '타입', type: 'string', width: 140 },
]

export const AdColumns = [
  { field: '시간설정', type: 'string', width: 220 },
  { field: '닉네임', type: 'string', width: 165 },
  { field: '날짜', type: 'string', width: 145 },
  { field: '타입', type: 'string', width: 155 },
]

export const defaultOptions = {
  arrowColor: '#fff',
  backgroundColor: '#fff',
  beaconSize: 36,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  primaryColor: '#f04',
  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  textColor: '#333',
  zIndex: 10000,
}

export const QuestionIconGuide = styled(QuestionMarkIcon)({
  backgroundColor: 'tomato',
  color: 'white',
  width: '30px',
  height: '30px',
  position: 'absolute',
  left: '11%',
  bottom: '17%',
  borderRadius: '15px',
  cursor: 'pointer',
  willChange: 'transform',
  animation: 'guide 3s ease-in-out infinite',

  '@keyframes guide': {
    '0%': {
      transform: 'none',
    },
    '50%': {
      transform: 'translateY(-5px) rotateY(360deg)',
    },
    '100%': {
      transform: 'none',
    },
  },
})
