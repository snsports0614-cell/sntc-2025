
export enum InquiryType {
  LESSON = '레슨 상담',
  FC_TEST = 'SN FC 입단 문의',
  YOUTH = 'SN 유스',
  DIRECTOR = '대표 직강 문의'
}

export interface CareerItem {
  title: string;
  description: string;
}

export interface SessionInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  type: string;
  message: string;
  date: string;
  isAiRecommendation?: boolean;
}
