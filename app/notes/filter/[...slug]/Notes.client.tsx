"use client";

import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useState } from "react";
import css from "./Notes.module.css";
import Loader from "@/components/Loader/Loader";
import NoteList from "@/components/NoteList/NoteList";
import Error from "../../error";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const onChange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

  const handleSearch = useDebouncedCallback((search: string) => {
    setDebouncedSearch(search);
  }, 300);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, tag, page],
    queryFn: () => fetchNotes(debouncedSearch, tag, page),
    placeholderData: keepPreviousData,
    initialData,
    enabled: true,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={onChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onChange={setPage}
          />
        )}
        <Link href={`/notes/action/create`} className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}

      {isError && <Error error={error} />}

      {isSuccess && data ? (
        data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>Notes not found</p>
        )
      ) : null}
    </div>
  );
}
