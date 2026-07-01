import ContactCard from "../components/contacts/ContactCard";
import ContactForm from "../components/contacts/ContactForm";
import SectionTitle from "../components/shared/SectionTitle";

function ContactsPage({ contacts, onAddContact, onDeleteContact }) {
  return (
    <div className="page-stack">
      <ContactForm onAddContact={onAddContact} />

      <section>
        <SectionTitle>Contacts</SectionTitle>
        <div className="stack">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ContactsPage;