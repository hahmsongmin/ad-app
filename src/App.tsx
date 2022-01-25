import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LogDataList from "./views/LogDataList";
import "./views/dataList.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import {
  AdInquire,
  ConcatType,
  getAdInquire,
  getLectureInquire,
  getPresentInquire,
  LectureInquire,
  PresentInquire,
  setGlobalSpaceId,
} from "./service/api";
import AdDataList from "./views/AdDataList";
import Admin from "./views/Admin";
import { GRID_DEFAULT_LOCALE_TEXT } from "./config";

export type LogInfo = {
  memberName: string;
  date: string;
  enterDt: string;
  leaveDt: string;
  memberType: string;
};

const TEST_DATA: AdInquire = {
  code: 1000,
  message: "ok",
  results: [
    {
      spaceId: 221,
      memberId: 3724,
      memberName: "막국수",
      enterDt: "2022-01-18 07:38:32",
      leaveDt: "2022-01-18 08:50:32",
      isMember: "Y",
    },
    {
      spaceId: 345,
      memberId: 3725,
      memberName: "쌀국수",
      enterDt: "2022-01-19 14:12:40",
      leaveDt: "2022-01-20 08:55:32",
      isMember: "Y",
    },
    {
      spaceId: 347,
      memberId: 3723,
      memberName: "짜장면",
      enterDt: "2022-01-20 22:20:30",
      leaveDt: "2022-01-21 09:20:32",
      isMember: "N",
    },
  ],
};

const TEST_DATA1: ConcatType = {
  "345": {
    lectureId: 345,
    spaceId: 345,
    lectureName: "1교시 영어",
    startTime: "09:00",
    endTime: "10:10",
    person: [
      {
        presentId: 123,
        lectureId: 233,
        memberName: "짜장면",
        memberId: 3723,
        presentDate: "2022-01-22",
        present: "출석",
        isMember: "게스트",
      },
      {
        presentId: 124,
        lectureId: 233,
        memberName: "막국수",
        memberId: 3724,
        presentDate: "2022-01-22",
        present: "출석",
        isMember: "멤버",
      },
      {
        presentId: 125,
        lectureId: 233,
        memberName: "진짬뽕",
        memberId: 3724,
        presentDate: "2022-01-22",
        present: "출석",
        isMember: "멤버",
      },
    ],
  },
  "346": {
    lectureId: 346,
    spaceId: 345,
    lectureName: "2교시 미술",
    startTime: "09:00",
    endTime: "10:10",
    person: [
      {
        presentId: 123,
        lectureId: 233,
        memberName: "막국수",
        memberId: 3724,
        presentDate: "2022-01-22",
        present: "출석",
        isMember: "멤버",
      },
    ],
  },
  "347": {
    lectureId: 347,
    spaceId: 345,
    lectureName: "3교시 과학",
    startTime: "09:00",
    endTime: "10:10",
    person: [
      {
        presentId: 123,
        lectureId: 233,
        memberName: "쌀국수",
        memberId: 3725,
        presentDate: "2022-01-22",
        present: "출석",
        isMember: "멤버",
      },
    ],
  },
};

const TEST_DATA2: PresentInquire = {
  code: 1000,
  message: "ok",
  presents: [
    {
      presentId: 240,
      lectureId: 223,
      memberId: 3724,
      presentDate: "2022-01-20",
      present: "출결",
      isMember: "멤버",
    },
    {
      presentId: 240,
      lectureId: 223,
      memberId: 3725,
      presentDate: "2022-01-20",
      present: "출결",
      isMember: "멤버",
    },
    {
      presentId: 240,
      lectureId: 223,
      memberId: 3723,
      presentDate: "2022-01-20",
      present: "출결",
      isMember: "멤버",
    },
  ],
};

function App() {
  const [logDataInfo, setLogDataInfo] = useState<LogInfo[]>([]);
  const [concatData, setConcatData] = useState<ConcatType>({});
  const [adminData, setAdminData] = useState<LectureInquire["lectures"]>([]);
  const [isConcatDataOK, setIsConcatDataOK] = useState<Boolean>(false);
  const [lectureId, setLectureId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndtDate] = useState<string>("");

  const spaceIdRef = useRef<number>(0);

  useEffect(() => {
    const commonDt = (Dt: string): string => {
      return new Date(new Date(Dt).getTime() + 540 * 60 * 1000).toLocaleString("ko-KR");
    };

    const transferDate = (_enterDt: string): string => {
      const dateTemp = commonDt(_enterDt).slice(2, 13).replaceAll(" ", "");
      const findComma = dateTemp.lastIndexOf(".");
      const date = dateTemp.slice(0, findComma);
      return date;
    };

    const transferTime = (_enterDt: string, _leaveDt: string = ""): [string, string] => {
      const dtTemp = commonDt(_enterDt).split(" ")[commonDt(_enterDt).split(" ").length - 1].split(":");
      const enterDt = [String(dtTemp[0]).padStart(2, "0"), String(dtTemp[1]).padStart(2, "0")].join(":");
      let leaveDt = _leaveDt;
      if (_leaveDt === "") {
        leaveDt = _leaveDt;
      } else {
        const dtTemp = commonDt(_leaveDt).split(" ")[commonDt(_leaveDt).split(" ").length - 1].split(":");
        leaveDt = [String(dtTemp[0]).padStart(2, "0"), String(dtTemp[1]).padStart(2, "0")].join(":");
      }
      return [enterDt, leaveDt];
    };

    const logDataInfo = (_result: AdInquire["results"]) => {
      const infoArray: LogInfo[] = [];
      const newData = [..._result];
      newData.forEach((info) => {
        const logData: LogInfo = {
          memberName: info.memberName,
          date: transferDate(info.enterDt),
          enterDt: transferTime(info.enterDt)[0],
          leaveDt: info.leaveDt === null ? "" : transferTime(info.enterDt, info.leaveDt)[1],
          memberType: info.isMember ?? "",
        };
        infoArray.push(logData);
      });
      if (infoArray.length > 0) {
        setLogDataInfo(() => {
          return infoArray.map((info) => info);
        });
      }
    };

    const getTodate = (): string => {
      const date: string[] = new Date().toLocaleString().split(".")!;
      const year = date[0];
      const month = date[1];
      const day = date[2];
      return `${year.trim()}.${month.trim().padStart(2, "0")}.${day.trim().padStart(2, "0")}`;
    };

    const getInitHandler = async () => {
      console.log("✅ 데이터 조회");
      try {
        const adResults: AdInquire["results"] = await getAdInquire();
        const lectureResults: LectureInquire["lectures"] | undefined = await getLectureInquire();
        logDataInfo(TEST_DATA.results); // attend api 💡 adResults
        // TEST 용
        setConcatData(TEST_DATA1); // concatResultes
        setLectureId(Object.keys(TEST_DATA1));
        setIsConcatDataOK(true);
        //
        if (lectureResults != null) {
          let _startDate = startDate;
          let _endDate = endDate;
          if (_startDate === "" && _endDate === "") {
            _startDate = getTodate();
            _endDate = getTodate();
          } else if (_endDate === "") {
            _endDate = _startDate;
          }
          setAdminData(lectureResults);
          const concatResults: ConcatType = await getPresentInquire(lectureResults, _startDate, _endDate);
          setIsConcatDataOK(Object.keys(concatResults).length > 0 ? true : false);
          setConcatData(concatResults);
          setLectureId(Object.keys(concatResults));
        }
      } catch {
      } finally {
        setIsLoading(false);
        setVisible(true);
      }
    };

    if (refresh) {
      getInitHandler();
      setRefresh((curr: boolean) => !curr);
    }

    // 스페이스 진입 => 클라(memberId, spaceId 로 api 출석 추가)
    // 스페이스 나갈시 => 클라(memberId, spaceId 로 api 퇴실 추가)
    // 출석부 클릭 시 spaceId로 api 출석 조회 화면에 출력 (spaceId 넘겨주세요)

    const adBtn = document.querySelector(".ad")!;
    // 이벤트 정의 하세요(클라-출석부) =>
    const spaceId: number = 345;
    adBtn.addEventListener("click", () => {
      spaceIdRef.current = spaceId;
      setGlobalSpaceId(spaceId);
      getInitHandler();
    });
  }, [refresh, concatData, startDate, endDate]);

  const searchDate = () => {
    setRefresh(true);
  };

  return (
    <AppContainer className="App" visible={visible}>
      <Title>출결관리</Title>
      <CloseBtn className="close" onClick={() => setVisible(false)}>
        <IconButton color="inherit">
          <CloseIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
      </CloseBtn>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab onClick={() => (GRID_DEFAULT_LOCALE_TEXT.isClickEdit = false)}>출석 로그</Tab>
          <Tab onClick={() => (GRID_DEFAULT_LOCALE_TEXT.isClickEdit = false)}>출석부</Tab>
          <Tab onClick={() => (GRID_DEFAULT_LOCALE_TEXT.isClickEdit = true)}>수업 설정</Tab>
        </TabsList>
        <TabPanel value={0}>
          <LogDataList logDataInfo={logDataInfo} />
        </TabPanel>
        <TabPanel value={1}>
          <AdDataList
            concatData={concatData}
            lectureId={lectureId}
            isConcatDataOK={isConcatDataOK}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndtDate={setEndtDate}
            searchDate={searchDate}
          />
        </TabPanel>
        <TabPanel value={2}>
          <Admin adminData={adminData} />
        </TabPanel>
      </TabsUnstyled>
      <ReFresh>
        <Button onClick={() => setRefresh(true)} variant="contained" endIcon={<RefreshIcon />} sx={{ width: 120 }}>
          새로고침
        </Button>
      </ReFresh>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible === true ? "flex" : "none")};
  position: relative;
  max-width: 790px;
  height: 620px;
  flex-direction: column;
  padding: 60px;
  padding-bottom: 50px;
  margin: 0 auto;
  background-color: #00a29a;
  border-radius: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
`;

const ReFresh = styled.div`
  position: absolute;
  bottom: 30px;
  right: 60px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: end;
`;

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  border: 2px solid white;

  &:hover {
    background-color: white;
    color: #00a29a;
  }

  &:focus {
    color: white;
    border-radius: 3px;
    outline: 2px solid #00a29a;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color: #00a29a;
  }

  &.${buttonUnstyledClasses.disabled} {
    border: 2px solid white;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.7rem;
`;

const TabsList = styled(TabsListUnstyled)`
  z-index: 10;
  position: absolute;
  left: 385px;
  top: 98px;
  min-width: 370px;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  button {
    display: flex;
    align-items: center;
    width: 100px;
    height: 40px;
    box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
  }
`;
