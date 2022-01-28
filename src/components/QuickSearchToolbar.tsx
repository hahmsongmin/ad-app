import { GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { GRID_DEFAULT_LOCALE_TEXT } from "../config";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const QuickSearchToolbar = (props: QuickSearchToolbarProps) => {
  return (
    <Container>
      <FilterDensityBox>
        <FilterBtn />
        <DensitySelector sx={{ display: GRID_DEFAULT_LOCALE_TEXT.isClickEdit ? "none" : "visible" }} />
      </FilterDensityBox>
      <ExportBox>
        <Export
          title="내보내기"
          csvOptions={{
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </ExportBox>
    </Container>
  );
};

export default QuickSearchToolbar;

const Container = styled(Box)({
  p: 1,
  pb: 1,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
});

const FilterDensityBox = styled(Box)({
  padding: 1,
  paddingBottom: 1,
  justifyContent: "space-between",
  display: "flex",
  alignItems: "center",
});

const FilterBtn = styled(GridToolbarFilterButton)({
  fontSize: 17,
  color: "white",
  marginRight: 2,
});

const DensitySelector = styled(GridToolbarDensitySelector)({
  fontSize: 17,
  color: "white",
});

const ExportBox = styled(Box)({
  backgroundColor: "tomato",
  position: "absolute",
  left: 685,
  width: 100,
  height: 43,
  display: "flex",
  justifyContent: "center",
  borderRadius: 5,
});

const Export = styled(GridToolbarExport)({
  color: "white",
});
