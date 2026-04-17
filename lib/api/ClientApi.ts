import API from './api'
import type { Note, NoteTag, FetchNotesResponse, AuthRequest, CheckSessionRequest } from '@/types/note'
import type { User } from '@/types/user'

export const fetchNotes = async (
    page: number,
    search: string,
    tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
    const response = await API.get<FetchNotesResponse>('/notes', {
        params: {
            search,
            page,
            ...(tag ? { tag } : {}),
            perPage: 12,
        },
    });
    return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await API.get<Note>(`/notes/${id}`);
    return response.data;
};

export interface CreateNoteData {
    title: string;
    content: string;
    tag: NoteTag;
}

export const createNote = async (data: CreateNoteData): Promise<Note> => {
    const response = await API.post<Note>('/notes', data);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await API.delete<Note>(`/notes/${id}`);
    return response.data;
};

export type RegisterParams = {
    email: string;
    password: string;
};

export const register = async (data: RegisterParams): Promise<User> => {
    const res = await API.post<User>('/auth/register', data);
    return res.data;
};

export const login = async (data: RegisterParams): Promise<User> => {
    const res = await API.post<User>('/auth/login', data);
    return res.data;
};

export const logout = async (): Promise<void> => {
    await API.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
    const { data } = await API.get<CheckSessionRequest>('/auth/session');
    return data.success;
};

export const getMe = async (): Promise<User> => {
    const { data } = await API.get<User>('/users/me');
    return data;
};

export const updateMe = async (data: AuthRequest): Promise<User> => {
    const res = await API.patch<User>('/users/me', data);
    return res.data;
};