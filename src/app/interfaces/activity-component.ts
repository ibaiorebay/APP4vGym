export interface ActivityComponentInterface {
    time: string;
    isFree: boolean;
    activity?: {
      name: string;
      icon: string;
      monitors: { name: string }[];
    };
  }
  