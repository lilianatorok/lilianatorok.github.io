import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <main className="home">
      <h1 className="sr-only">Liliána Török, product designer. Selected work.</h1>
      <aside className="intro">
        <p>
          Hey! I’m a product designer from Budapest. Since 2015, I’ve tried it all—from admin to
          testing, graphics, and product design. Big or small teams,{" "}
          <em>salty snacks required.</em>
        </p>
        <span className="status">Available for work</span>
      </aside>
      <ProjectList />
    </main>
  );
}
