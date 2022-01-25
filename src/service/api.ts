import axios from "axios";

type Common = {
  code: number;
  message: string;
};

export type AdInquire = Common & {
  results: {
    spaceId: number;
    memberId: number;
    memberName: string;
    isMember: string;
    enterDt: string;
    leaveDt: string | null;
  }[];
};

export type LectureInquire = Common & {
  lectures: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
  }[];
};

export type PresentInquire = Common & {
  presents: {
    presentId: number;
    lectureId: number;
    memberId: number;
    presentDate: string;
    present: string;
    isMember: string;
  }[];
};

type UserProps = {
  [T: string]: {
    memberId: number;
    memberName: string;
  };
};

let GLOBAL_SPACE_ID: number = 1;
const nickNameArray: UserProps = {};

export const setGlobalSpaceId = (spaceId: number): void => {
  GLOBAL_SPACE_ID = spaceId;
};

const apiBase = axios.create({
  baseURL: "https://admin.meetpage.io",
  withCredentials: true,
});

export const getAdInquire = async (): Promise<AdInquire["results"]> => {
  try {
    const { data }: { data: AdInquire } = await apiBase.get(`/attend/${GLOBAL_SPACE_ID}`);
    const keysArray: string[] = Object.keys(nickNameArray);
    data.results.forEach((user) => {
      keysArray.forEach((key) => {
        if (Number(key) !== user.memberId) {
          const keyName = user.memberId.toString();
          nickNameArray[keyName] = { memberId: user.memberId, memberName: user.memberName };
        }
      });
    });
    return data.results;
  } catch (e) {
    throw new Error("getAdInquire Faild");
  }
};

export const getLectureInquire = async (): Promise<LectureInquire["lectures"] | undefined> => {
  try {
    const { data }: { data: LectureInquire } = await apiBase.get(`/lecture/${GLOBAL_SPACE_ID}`);
    if (data.lectures != null) {
      return data.lectures;
    }
  } catch (e) {
    throw new Error("getLectureInquire Faild");
  }
};

export type ConcatType = {
  [key: string]: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
    person: {
      presentId: number;
      lectureId: number;
      memberName: string;
      memberId: number;
      presentDate: string;
      present: string;
      isMember: string;
    }[];
  };
};

const getNickName = (memberId: number) => {
  return nickNameArray[String(memberId)].memberName;
};

export const getPresentInquire = async (
  lectureResults: LectureInquire["lectures"],
  startDate: string,
  endDate: string
): Promise<ConcatType> => {
  let adInfoConcat: ConcatType = {};
  try {
    await Promise.all(
      lectureResults.map(async (info) => {
        const { data }: { data: PresentInquire } = await apiBase.get(`/present/${info.lectureId}`, {
          params: {
            startDate,
            endDate,
          },
        });
        if (data != null) {
          adInfoConcat = {
            ...adInfoConcat,
            [String(info.lectureId)]: {
              lectureId: info.lectureId,
              spaceId: info.spaceId,
              lectureName: info.lectureName,
              startTime: info.startTime,
              endTime: info.endTime,
              person: data?.presents?.map((item) => {
                return {
                  ...item,
                  memberName: getNickName(item.memberId),
                };
              }),
            },
          };
        }
      })
    );
  } catch (e) {
    throw new Error("getPresentInquire Faild");
  } finally {
    return adInfoConcat;
  }
};

export const postPresentModification = async (presentId: number, present: string) => {
  await apiBase.post(`/present/${presentId}`, { params: { presentId, present } });
};

export const putLectureAdd = async (lectureName: string, startTime: string, endTime: string) => {
  console.log(lectureName, startTime, endTime);
  const response = await apiBase.put(`/lecture/${GLOBAL_SPACE_ID}`, {
    params: {
      lectureName,
      startTime,
      endTime,
    },
  });
  if (response?.data?.code === 1000) {
  }
};
