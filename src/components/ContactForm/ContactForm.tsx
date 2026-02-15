import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../Button";
import type { Contact } from "../../types";
import "./ContactForm.css";

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      return;
    }

    onSubmit({
      id: Date.now(),
      name: trimmedName,
      phone: trimmedPhone,
    });

    setName("");
    setPhone("");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title">연락처 등록</h2>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="name">
          이름
        </label>
        <input
          className="contact-form__input"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="phone">
          전화번호
        </label>
        <input
          className="contact-form__input"
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력하세요"
        />
      </div>
      <Button type="submit">등록</Button>
    </form>
  );
}
