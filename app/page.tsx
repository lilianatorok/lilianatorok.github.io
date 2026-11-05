import HomeIntro from "@/components/HomeIntro";
import ProjectList from "@/components/ProjectList";
import ProjectListAlt from "@/components/ProjectListAlt";

// Which Works list the home page shows on desktop:
// 1 = the infinite loop with centred names (the first version, also kept at /v1),
// 2 = the left-aligned list played once, with the picture following the cursor.
// Phones always get the loop: each project's picture builds up from tiles, with its name under it.
const HOME_VERSION: 1 | 2 = 2;

export default function Home() {
  return (
    <main className={HOME_VERSION === 2 ? "home home-alt" : "home"}>
      <HomeIntro />
      <ProjectList />
      {HOME_VERSION === 2 && <ProjectListAlt />}
    </main>
  );
}
