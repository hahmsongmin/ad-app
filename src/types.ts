export type CommonCode = {
  code: number;
  message: string;
};

export type LogInfo = {
  memberId: number;
  memberName: string;
  date: string;
  enterDt: string;
  leaveDt: string;
  memberType: boolean;
};

export type LectureProps = {
  [T: string]: {
    lectureName: string;
    startTime?: string;
    endTime?: string;
  };
};

export type AdInquireObj = {
  spaceName: string;
  spaceId: number;
  memberId: number;
  memberName: string;
  isMember: string;
  enterDt: string;
  leaveDt: string | null;
};

export type SpaceUserInfo = {
  id: number;
  name: string;
  userId: number | null; // member | guest
}[];

export type AdInquire = CommonCode & {
  results: AdInquireObj[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type LectureInquire = CommonCode & {
  lectures: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
  }[];
};

export type PresentInquireObj = {
  presentId: number;
  lectureId: number;
  memberId: number;
  presentDate: string;
  present: string;
  isMember: boolean;
};

export type PresentInquire = CommonCode & {
  results: PresentInquireObj[];
};

export type UserProps = {
  [T: string]: {
    memberId: number;
    memberName: string;
  };
};

type PersonProps = PresentInquireObj & {
  memberName: string;
};

export type ConcatType = {
  [key: string]: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
    person?: PersonProps[];
  };
};

// Type 수정 => guide 국가별
// Language Type

export type RowsLanguageType<T> = {
  [P in keyof T]: T[P];
};

export type WhatIsLang = 'ko' | 'en' | 'ja' | '';

// Log
type LogDataRowsPropsKo = {
  id: number;
  닉네임: string;
  날짜: string;
  입장: string;
  퇴장: string;
  타입: string;
};

type LogDataRowsPropsEn = {
  id: number;
  Nickname: string;
  Date: string;
  Enter: string;
  Exit: string;
  Type: string;
};

type LogDataRowsPropsJa = {
  id: number;
  ニックネーム: string;
  日付: string;
  入場: string;
  退場: string;
  タイプ: string;
};

export type LogDataRowsLanguage = LogDataRowsPropsKo[] | LogDataRowsPropsEn[] | LogDataRowsPropsJa[];

// Ad
export type AdDataRowsPropsKo = {
  id: number;
  닉네임: string;
  날짜: string;
  시간설정: string;
  출결: string;
  타입: string;
};

export type AdDataRowsPropsEn = {
  id: number;
  Nickname: string;
  Date: string;
  TimeSet: string;
  Attendance: string;
  Type: string;
};

export type AdDataRowsPropsJa = {
  id: number;
  ニックネーム: string;
  日付: string;
  時間設定: string;
  出席: string;
  タイプ: string;
};

export type AdDataRowsLanguage = AdDataRowsPropsKo | AdDataRowsPropsEn | AdDataRowsPropsJa;

// Admin

export type AdminRowsPropsKo = {
  id: number;
  NO: number;
  시간설정: string;
  시작시간: string;
  종료시간: string;
};

export type AdminRowsPropsEn = {
  id: number;
  NO: number;
  TimeSet: string;
  StartTime: string;
  EndTime: string;
};

export type AdminRowsPropsJa = {
  id: number;
  NO: number;
  時間設定: string;
  開始時間: string;
  終了時間: string;
};

export type AdminRowsLanguage = AdminRowsPropsKo | AdminRowsPropsEn | AdminRowsPropsJa;
