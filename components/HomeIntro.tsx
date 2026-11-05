// The home page heading and the short intro in the bottom left corner, shared by both Works lists.
export default function HomeIntro() {
  return (
    <>
      <h1 className="sr-only">Liliána Török, product designer. Selected work.</h1>
      <aside className="intro">
        <p>
          Hey! I’m a product designer from Budapest. Since 2015, I’ve tried it all—from admin to
          testing, graphics, and product design. Big or small teams,{" "}
          <em>salty snacks required.</em>
        </p>
        <span className="status">Available for work</span>
      </aside>
    </>
  );
}
