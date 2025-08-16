import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug[0]} notes`,
    description: `Notes list by category ${slug[0]}`,
    openGraph: {
      title: `${slug[0]} notes`,
      description: `Notes list by category ${slug[0]}`,
      url: `https://08-zustand-two-xi.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${slug[0]} notes`,
        },
      ],
    },
  };
}

export default async function NotesByFilter({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? "" : slug[0];
  const response = await fetchNotes("", category, 1);

  return (
    <div>
      <NotesClient initialData={response} tag={category} />
    </div>
  );
}
