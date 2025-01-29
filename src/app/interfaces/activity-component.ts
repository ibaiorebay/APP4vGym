export interface ActivityComponentInterface {
  id: number;
  isFree: boolean;
  activity?: {
    id: number;
    name: string;
    icon?: string;
    monitors: {
      id: number;
      name: string;
    }[];
    dateStart: string;
    dateEnd: string;
  };
}
