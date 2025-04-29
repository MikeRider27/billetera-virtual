import React, { useState } from "react";
import api from "../api/api";

export default function RegistroCliente() {
  const [form, setForm] = useState({
    documento: "",
    nombre: "",
    email: "",
    celular: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/registro-cliente", form);
      setResponse({ success: true, mensaje: res.data.mensaje });
      setForm({ documento: "", nombre: "", email: "", celular: "" }); // limpiar formulario
    } catch (err) {
      setResponse({ success: false, mensaje: "Error en el registro" });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Cliente</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="documento"
          placeholder="Documento"
          value={form.documento}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Registrar</button>
      </form>

      {response && (
        <div
          style={{
            ...styles.responseBox,
            backgroundColor: response.success ? "#d4edda" : "#f8d7da",
            color: response.success ? "#155724" : "#721c24",
            borderColor: response.success ? "#c3e6cb" : "#f5c6cb",
          }}
        >
          <p style={styles.pre}>{response.mensaje}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  responseBox: {
    marginTop: "1.5rem",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "5px",
  },
  pre: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: "bold",
  },
};
