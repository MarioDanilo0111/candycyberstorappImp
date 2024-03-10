export interface RootTags {
  status: string;
  data: Daum[];
}

export interface Daum {
  id: number;
  name: string;
  slug: string;
}
