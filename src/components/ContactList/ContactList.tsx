import type { Contact } from "../../types";
import "./ContactList.css";

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <div className="contact-list">
      <h2 className="contact-list__title">연락처 목록</h2>
      {contacts.length === 0 ? (
        <p className="contact-list__empty">등록된 연락처가 없습니다.</p>
      ) : (
        <table className="contact-list__table">
          <thead>
            <tr>
              <th>이름</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
