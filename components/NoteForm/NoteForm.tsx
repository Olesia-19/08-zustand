"use client";

import { ChangeEvent, useId } from "react";
import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { NewNoteData } from "@/types/note";
import { useNoteDraftStore } from "@/lib/stores/noteStore";

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push(`/notes/filter/All`);
      clearDraft();
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setDraft({
      ...(draft as NewNoteData),
      [e.target.name as keyof NewNoteData]: e.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(data);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${fieldId}-title`}
          className={css.input}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft?.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft?.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          {isPending ? "Creating new note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
