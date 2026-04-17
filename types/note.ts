export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: NoteTag
}

export type Props = {
  params: Promise<{ id: string }>
}

export interface NewNotePayload {
  title: string;
  content: string;
  tag: NoteTag
}

export type AuthRequest = {
  email?: string;
  password?: string;
  username?: string;
};

export type CheckSessionRequest = {
  message: string
  success: boolean
}

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

// export type User = {
//   id: string;
//   email: string;
//   userName?: string;
//   photoUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// };