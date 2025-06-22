export interface Competition {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  id: number;
  competitionId: number;
  club1Id: number;
  club2Id: number;
  score1?: number;
  score2?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Club {
  id: number;
  name: string;
  address?: string;
  contactMail?: string;
  contactTel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  license: string;
  clubId: number;
  userId?: number;
}

export interface User {
  id: number;
  login: string;
  profile: 'ADMIN' | 'CLUB_MANAGER' | 'PLAYER' | 'REFEREE';
}

export interface Hall {
  id: number;
  name: string;
  location: string;
}