"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { NewNoteData } from "@/types/note";

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push(`/notes/filter/All`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(data);
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
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          {isPending ? "Creating new note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
