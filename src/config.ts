interface GridLocaleText {
  //
  toolbarExport: React.ReactNode;
  toolbarExportLabel: string;
  toolbarExportCSV: React.ReactNode;
  toolbarExportPrint: React.ReactNode;
  //
  toolbarFilters: React.ReactNode;
  toolbarDensity: React.ReactNode;
  toolbarDensityLabel: string;
  toolbarDensityCompact: string;
  toolbarDensityStandard: string;
  toolbarDensityComfortable: string;
  toolbarFiltersLabel: string;
  //
  noRowsLabel: string;
  noResultsOverlayLabel: string;
  //
  checkboxSelectionHeaderName: string;
  //
  columnMenuShowColumns: React.ReactNode;
  columnMenuFilter: React.ReactNode;
  columnMenuHideColumn: React.ReactNode;
  columnMenuUnsort: React.ReactNode;
  columnMenuSortAsc: React.ReactNode;
  columnMenuSortDesc: React.ReactNode;
  columnsPanelTextFieldLabel: string;
  columnsPanelTextFieldPlaceholder: string;
  columnsPanelShowAllButton: React.ReactNode;
  columnsPanelHideAllButton: React.ReactNode;
  //
  filterPanelColumns: React.ReactNode;
  filterPanelOperators: React.ReactNode;
  filterPanelInputLabel: string;
  filterPanelInputPlaceholder: string;
  filterOperatorContains: string;
  filterOperatorEquals: string;
  filterOperatorStartsWith: string;
  filterOperatorEndsWith: string;
  filterOperatorIsEmpty: string;
  filterOperatorIsNotEmpty: string;
  isClickEdit: boolean;
  //
  footerRowSelected: (count: number) => React.ReactNode;
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
  //

  isClickEdit: false,
  footerRowSelected: (count) => {
    const ok: boolean = GRID_DEFAULT_LOCALE_TEXT.isClickEdit;
    if (ok === false) {
      return `총 ${count.toLocaleString()} 명`;
    } else {
      return `총 ${count.toLocaleString()} 개`;
    }
  },
};

// styles

const COLUMNS_WIDTH: number = 140;

export const DataListBox = {
  display: 'flex',
  backgroundColor: 'inherit',
  height: 600,
  width: '100%',
  borderRadius: 10,
  margin: '0 auto',
  '& .MuiDataGrid-cell--editable': {
    bgcolor: 'rgba(217,243,190,0.5)',
  },
};

export const FromControl = {
  zIndex: 10,
  m: 1,
  minWidth: 100,
  position: 'absolute',
  transform: 'translate(160px, -5px)',
};

// columns

export const LogColumns = [
  { field: '닉네임', type: 'string', width: COLUMNS_WIDTH },
  { field: '날짜', type: 'string', width: COLUMNS_WIDTH },
  { field: '입장', type: 'string', width: COLUMNS_WIDTH },
  { field: '퇴장', type: 'string', width: COLUMNS_WIDTH },
  { field: '타입', type: 'string', width: COLUMNS_WIDTH },
];

export const AdColumns = [
  { field: '수업명', type: 'string', width: COLUMNS_WIDTH },
  { field: '닉네임', type: 'string', width: COLUMNS_WIDTH },
  { field: '날짜', type: 'string', width: COLUMNS_WIDTH },
  { field: '타입', type: 'string', width: COLUMNS_WIDTH },
  {
    field: '출결',
    width: COLUMNS_WIDTH,
    type: 'singleSelect',
    valueOptions: ['출석', '미출석'],
    editable: true,
  },
];
