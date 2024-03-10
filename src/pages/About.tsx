import { useSEO } from "../hooks/useSEO";

export function About() {
  /* use useSEO */
  useSEO({
    title: `About Page - Godis Butiken Borta Kväll`,
    description: `Borta Kväll`,
  });
  return <h1>About</h1>;
}
