import { useSEO } from "../hooks/useSEO";

export function Home() {
  /* use useSEO */
  useSEO({
    title: `Home Page - Godis Butiken Borta Kväll`,
    description: `Borta Kväll`,
  });
  return <h1>Home</h1>;
}
