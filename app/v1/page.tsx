import HomeIntro from "@/components/HomeIntro";
import ProjectList from "@/components/ProjectList";

// The first version of the home page, with the infinite Works loop, kept to look at or switch back to.
export default function HomeV1() {
  return (
    <main className="home">
      <HomeIntro />
      <ProjectList />
    </main>
  );
}
