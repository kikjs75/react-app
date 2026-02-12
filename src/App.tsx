import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: 48 }}>
      <h1>Button Component</h1>

      <section style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </section>

      <section style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </section>

      <section style={{ display: "flex", gap: 12 }}>
        <Button disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled Danger</Button>
      </section>

      <section>
        <Button onClick={() => alert("Clicked!")}>Click Me</Button>
      </section>
    </div>
  );
}

export default App;
