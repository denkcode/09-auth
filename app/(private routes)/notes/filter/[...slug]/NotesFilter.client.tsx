'use client'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api/ClientApi'
import { FetchNotesResponse } from '@/types/note'
import NoteList from '@/components/NoteList/NoteList'
interface Props {
    tag: string;
    search: string;
}

export default function NotesFilter({ tag, search }: Props) {
const { data } = useQuery<FetchNotesResponse>({
  queryKey: ['notes', 1, tag, search],
  queryFn: () => fetchNotes(1, search, tag),
  placeholderData: keepPreviousData,
})
    return <div>{data?.notes && <NoteList notes={data.notes} />}</div>
}