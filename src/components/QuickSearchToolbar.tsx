import { GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const QuickSearchToolbar = (props: QuickSearchToolbarProps) => {
  return (
    <Box
      sx={{
        p: 1,
        pb: 1,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          p: 0.2,
          pb: 1,
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <GridToolbarFilterButton
          sx={{
            fontSize: 17,
            color: 'white',
            marginRight: 2,
          }}
        />
        <GridToolbarDensitySelector
          sx={{
            fontSize: 17,
            color: 'white',
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: 'tomato',
          width: 100,
          height: 43,
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 1,
        }}
      >
        <GridToolbarExport
          style={{ color: 'white' }}
          title="내보내기"
          csvOptions={{
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </Box>
    </Box>
  );
};

export default QuickSearchToolbar;
