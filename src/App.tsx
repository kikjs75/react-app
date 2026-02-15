import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import type { Contact } from "./types";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  function handleAddContact(contact: Contact) {
    setContacts((prev) => [...prev, contact]);
  }

  return (
    <div className="app">
      <h1 className="app__title">연락처 관리</h1>
      <div className="app__content">
        <ContactForm onSubmit={handleAddContact} />
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
