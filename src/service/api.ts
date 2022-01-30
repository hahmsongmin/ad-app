import axios, { AxiosInstance } from 'axios';
import { LogTest } from '../TestData';
import { AdInquire, CommonCode, ConcatType, LectureInquire, PresentInquire, UserProps } from '../types';

interface IApiProvider {
  setSpaceAndMemberId(spaceId: number, memberId: number): void;
  //
  getAdInquire(): Promise<AdInquire['results']>;
  //
  getPresentInquire(
    lectureResults: LectureInquire['lectures'],
    startDate: string,
    endDate: string
  ): Promise<ConcatType | void>;
  postPresent(presentId: number, present: string): void;
  putPresent(lectureId: number): Promise<CommonCode>;
  //
  getLectureInquire(): Promise<LectureInquire['lectures'] | undefined>;
  postLecture(lectureId: number, lectureName: string, startTime: string, endTime: string): void;
  putLecture(lectureName: string, startTime: string, endTime: string): Promise<CommonCode>;
  deleteLecture(lectureId: number): void;
}

class ApiCallers implements IApiProvider {
  private apiBase: AxiosInstance;
  private _spaceId: number = 0;
  private _memberId: number = 0;
  private nickNameObject: UserProps = {};
  private constructor() {
    this.apiBase = axios.create({
      baseURL: 'https://admin.meetpage.io',
      withCredentials: true,
    });
  }
  private getNickName(memberId: number): string {
    if (this.nickNameObject[String(memberId)]) {
      return this.nickNameObject[String(memberId)].memberName;
    }
    return '';
  }
  static makeApi(): ApiCallers {
    return new ApiCallers();
  }

  setSpaceAndMemberId(spaceId: number, memberId: number) {
    this._spaceId = spaceId;
    this._memberId = memberId;
  }

  getAdInquire = async (): Promise<AdInquire['results']> => {
    try {
      const { data }: { data: AdInquire } = await this.apiBase.get(`/attend/${this._spaceId}`);
      LogTest.results.forEach((user) => {
        const keyName = user.memberId.toString();
        this.nickNameObject[keyName] = { memberId: user.memberId, memberName: user.memberName };
      });
      return data.results;
    } catch (e) {
      throw new Error('getAdInquire Faild');
    }
  };

  getPresentInquire = async (
    lectureResults: LectureInquire['lectures'],
    startDate: string,
    endDate: string
  ): Promise<ConcatType | void> => {
    let adInfoConcat: ConcatType = {};
    try {
      const ok = await Promise.allSettled(
        lectureResults.map(async (info) => {
          const {
            data: { presents },
          }: { data: { presents: PresentInquire['presents'] } } = await this.apiBase.get(`/present/${info.lectureId}`, {
            params: {
              startDate,
              endDate,
            },
          });
          adInfoConcat = {
            ...adInfoConcat,
            [String(info.lectureId)]: {
              lectureId: info.lectureId,
              spaceId: info.spaceId,
              lectureName: info.lectureName,
              startTime: info.startTime,
              endTime: info.endTime,
              person: presents.map((item) => {
                return {
                  ...item,
                  memberName: this.getNickName(item.memberId),
                };
              }),
            },
          };
        })
      );
      if (ok.some((all) => all.status === 'fulfilled')) {
        return adInfoConcat;
      }
    } catch (e) {
      throw new Error('getPresentInquire Faild');
    }
  };

  postPresent = async (presentId: number, present: string) => {
    await this.apiBase.post(`/present/${presentId}`, { params: { presentId, present } });
  };

  putPresent = async (lectureId: number): Promise<CommonCode> => {
    const { data }: { data: CommonCode } = await this.apiBase.put(`/present/${lectureId}`, {
      params: { memberId: this._memberId, present: 'absent' },
    });
    return data;
  };

  getLectureInquire = async (): Promise<LectureInquire['lectures'] | undefined> => {
    try {
      const { data }: { data: LectureInquire } = await this.apiBase.get(`/lecture/${this._spaceId}`);
      if (data.lectures != null) {
        return data.lectures;
      }
    } catch (e) {
      throw new Error('getLectureInquire Faild');
    }
  };

  putLecture = async (lectureName: string, startTime: string, endTime: string): Promise<CommonCode> => {
    const { data }: { data: CommonCode } = await this.apiBase.put(`/lecture/${this._spaceId}`, {
      params: {
        lectureName,
        startTime,
        endTime,
      },
    });
    return data;
  };

  postLecture = async (lectureId: number, lectureName: string, startTime: string, endTime: string) => {
    const { data }: { data: CommonCode } = await this.apiBase.post(`/lecture/${lectureId}`, {
      params: {
        lectureName,
        startTime,
        endTime,
      },
    });
    console.log(data);
  };

  deleteLecture = async (lectureId: number) => {
    await this.apiBase.delete(`/lecture/${lectureId}`);
  };
}

export default ApiCallers;
