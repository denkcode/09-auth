import { cookies } from 'next/headers'
import API from './api'
import type { Note, FetchNotesResponse, CheckSessionRequest } from '@/types/note'
import type { User } from '@/types/user'
import { AxiosResponse } from 'axios';

const getCookieHeader = async (): Promise<string> => {
    const cookieStore = await cookies();
    return cookieStore.toString();
};

export const fetchNotes = async (
    page: number,
    search: string,
    tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
    const response = await API.get<FetchNotesResponse>('/notes', {
        headers: { Cookie: await getCookieHeader() },
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
    const response = await API.get<Note>(`/notes/${id}`, {
        headers: { Cookie: await getCookieHeader() },
    });
    return response.data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await API.get<User>('/users/me', {
        headers: { Cookie: await getCookieHeader() },
    });
    return data;
};

export const checkSession = async (): Promise<AxiosResponse<CheckSessionRequest>> => {
     const response = await API.get<CheckSessionRequest>('/auth/session', {
        headers: { Cookie: await getCookieHeader() },
    });
    return response
;
};