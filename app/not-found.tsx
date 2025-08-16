import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 Page Not Found | NoteHub",
  description:
    "Sorry, the page you are looking for does not exist. Check the address or return to the NoteHub homepage.",
  openGraph: {
    title: "404 Page Not Found | NoteHub",
    description:
      "The page you are looking for does not exist. Please return to the NoteHub homepage.",
    url: "",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "not-found",
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
