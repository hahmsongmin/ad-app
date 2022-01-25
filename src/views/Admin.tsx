import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridEditRowsModel, GridRenderCellParams } from '@mui/x-data-grid';
import { DataListBox, GRID_DEFAULT_LOCALE_TEXT } from '../config';
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomPagination from '../components/CustomPagination';
import QuickSearchToolbar from '../components/QuickSearchToolbar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LectureInquire, putLectureAdd } from '../service/api';
import { ButtonGroup } from '@mui/material';

type AdminProps = {
  id: number;
  NO: number; // lectureId 1 부터
  수업명: string;
  시작시간: string;
  종료시간: string;
};

function Admin({ adminData: _adminData }: { adminData: LectureInquire['lectures'] }) {
  const [addVisible, setAddVisible] = useState(false);
  const [adminData, setAdminData] = useState<AdminProps[]>([]);
  const classNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const startTimeRef: React.RefObject<HTMLInputElement> = useRef(null);
  const endTimeRef: React.RefObject<HTMLInputElement> = useRef(null);
  let deleteRef = Array<number | string>();

  useEffect(() => {
    const data = _adminData.map((info) => {
      return {
        id: info.lectureId,
        NO: info.lectureId,
        수업명: info.lectureName,
        시작시간: info.startTime,
        종료시간: info.endTime,
      };
    });
    setAdminData(data);
  }, [_adminData]);

  const handleClickOpen = () => {
    setAddVisible(true);
  };

  const handleClose = () => {
    setAddVisible(false);
  };

  const EditRows = useCallback((rows: GridEditRowsModel) => {
    console.log(rows);
  }, []);

  const clickSaveBtn = async () => {
    const lectureName = classNameRef.current?.value;
    const startTime = startTimeRef.current?.value;
    const endTime = endTimeRef.current?.value;
    if (lectureName != null && startTime != null && endTime != null) {
      await putLectureAdd(lectureName, startTime, endTime);
    }
    setAddVisible(false);
  };

  const selectedIdForDelete = (selectedId: Set<number | string>) => {
    const arr: Array<number | string> = Array.from(selectedId.values());
    deleteRef = [...arr];
  };

  const AddTextFields = () => {
    return (
      <Dialog open={addVisible} onClose={handleClose}>
        <DialogTitle>추가</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={classNameRef}
            placeholder="수업명을 입력해주세요."
            autoFocus
            margin="dense"
            id="name"
            label="수업 명"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={startTimeRef}
            placeholder="시작시간을 입력해주세요. 예시(09:00)"
            margin="dense"
            id="name"
            label="시작시간"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={endTimeRef}
            placeholder="종료시간을 입력해주세요. 예시(10:00)"
            margin="dense"
            id="name"
            label="종료시간"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>뒤로가기</Button>
          <Button onClick={clickSaveBtn}>저장하기</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const BtnAddDeleteGroup = () => {
    const deleteHandleClick = useCallback(() => {
      const newAdminData = [...adminData];
      deleteRef.forEach((id) => {
        newAdminData.forEach((info, index) => {
          if (id === info.id) {
            newAdminData.splice(index, 1);
          }
        });
      });
      setTimeout(() => {
        setAdminData(newAdminData);
      }, 0);
      deleteRef = [];
    }, []);
    return (
      <Box sx={{ position: 'absolute', top: 182, left: 700, color: 'white' }}>
        <Button color="inherit" startIcon={<AddIcon />} onClick={handleClickOpen}>
          추가
        </Button>
        <Button color="inherit" startIcon={<DeleteIcon />} onClick={deleteHandleClick}>
          삭제
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Box sx={DataListBox}>
        <DataGrid
          rows={adminData}
          rowsPerPageOptions={[]}
          checkboxSelection
          onEditRowsModelChange={EditRows}
          onSelectionModelChange={(item) => {
            const selectedIDs = new Set(item);
            selectedIdForDelete(selectedIDs);
          }}
          pagination
          columns={[
            { field: 'NO', type: 'number', width: 100 },
            { field: '수업명', type: 'string', width: 200, editable: true },
            { field: '시작시간', type: 'string', width: 140, editable: true },
            { field: '종료시간', type: 'string', width: 140, editable: true },
            {
              field: 'actions',
              type: 'actions',
              width: 155,
              renderCell: (params: GridRenderCellParams) => {
                const onClickModification = () => {
                  console.log(params.row);
                };
                return (
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    style={{ borderRadius: 5 }}
                    startIcon={<EditIcon />}
                    onClick={onClickModification}
                  >
                    수정
                  </Button>
                );
              },
            },
          ]}
          editMode="row"
          components={{
            Toolbar: QuickSearchToolbar,
            Pagination: CustomPagination,
          }}
          localeText={GRID_DEFAULT_LOCALE_TEXT}
        />
      </Box>
      <AddTextFields />
      <BtnAddDeleteGroup />
    </>
  );
}

export default Admin;

// onRowEditStart={handleRowEditStart}
// onRowEditStop={handleRowEditStop}
// onCellFocusOut={handleCellFocusOut}
