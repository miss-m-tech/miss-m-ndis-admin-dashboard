import Card from "../shared/Card";

function ContactCard({ contact, onDelete }) {
  return (
    <Card>
      <h3>{contact.name}</h3>
      <p>{contact.role}</p>
      <p>{contact.organisation}</p>
      <p>{contact.phone}</p>
      <p>{contact.email}</p>

      <div style={{ marginTop: "10px" }}>
        <button
          style={{ background: "#dc2626" }}
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default ContactCard;