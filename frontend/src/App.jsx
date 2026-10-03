import { useState, useEffect } from 'react'

// api del backend en node
const API_URL = 'http://localhost:3000/personas'

const formularioVacio = {
  documento: 'Seleccione',
  numeroDocumento: '',
  name: '',
  lastName: '',
  address: '',
  ciudad: 'Seleccione',
  birthday: '',
  correo: '',
  celular: ''
}

function App() {
  const [personas, setPersonas] = useState([])
  const [form, setForm] = useState(formularioVacio)
  const [editId, setEditId] = useState(null) // si hay algo aca, estamos editando

  useEffect(() => {
    cargarPersonas()
  }, [])

  async function cargarPersonas() {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setPersonas(data)
    } catch (error) {
      alert('No se pudo conectar con el api. Revisa que json-server este corriendo.')
    }
  }

  function handleChange(e) {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  function soloNumeros(e) {
    const codigoTecla = e.charCode
    if (codigoTecla < 48 || codigoTecla > 57) {
      alert('Solo se permiten numeros en este campo.')
      e.preventDefault()
    }
  }

  function limpiarFormulario() {
    setForm(formularioVacio)
    setEditId(null)
  }

  function validarCampos() {
    if (form.documento === 'Seleccione' || form.numeroDocumento === '') {
      alert('Debe seleccionar el tipo de documento y escribir el número de documento.')
      return false
    }
    return true
  }

  async function handleGuardar() {
    if (!validarCampos()) return

    const yaExiste = personas.some(
      (p) => p.documento === form.documento && p.numeroDocumento === form.numeroDocumento
    )
    if (yaExiste) {
      alert('Ya existe una persona con ese documento. Usa Actualizar.')
      return
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    await cargarPersonas()
    limpiarFormulario()
  }

  // carga los datos de la fila en el formulario para poder editarlos
  function handleCargarParaEditar(persona) {
    setForm({
      documento: persona.documento,
      numeroDocumento: persona.numeroDocumento,
      name: persona.name,
      lastName: persona.lastName,
      address: persona.address,
      ciudad: persona.ciudad,
      birthday: persona.birthday,
      correo: persona.correo,
      celular: persona.celular
    })
    setEditId(persona.id)
  }

  async function handleActualizar() {
    if (editId === null) return
    if (!validarCampos()) return

    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    await cargarPersonas()
    limpiarFormulario()
  }

  async function handleEliminar(persona) {
    const confirmar = window.confirm(`¿Eliminar a ${persona.name} ${persona.lastName}?`)
    if (!confirmar) return

    await fetch(`${API_URL}/${persona.id}`, { method: 'DELETE' })

    await cargarPersonas()
    if (editId === persona.id) limpiarFormulario()
  }

  const enEdicion = editId !== null

  return (
    <>
      <div className="contenedor">
        <img src="/tdea.png" width="150" height="150" alt="Logo TDEA" />
        <div className="titulos">
          <h1>Tecnológico de Antioquia - Institución Universitaria</h1>
          <h1>Primer formulario</h1>
        </div>
      </div>

      <form id="formulario" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="documento">
          Tipo de documento
          <select
            id="documento"
            className="campo-documento"
            value={form.documento}
            onChange={handleChange}
          >
            <option>Seleccione</option>
            <option>Tarjeta de identidad</option>
            <option>Cédula de ciudadanía</option>
            <option>Cédula de extranjería</option>
          </select>
        </label>

        <br /><br />

        <label htmlFor="numeroDocumento">Número de documento</label>
        <input
          type="text"
          id="numeroDocumento"
          className="campo-numero"
          value={form.numeroDocumento}
          onChange={handleChange}
          onKeyPress={soloNumeros}
        />

        <br /><br />

        <label htmlFor="name">Nombres</label>
        <input
          type="text"
          id="name"
          className="campo-nombre"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          className="campo-apellido"
          value={form.lastName}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          className="campo-direccion"
          value={form.address}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="ciudad">Ciudad</label>
        <select
          id="ciudad"
          className="campo-ciudad"
          value={form.ciudad}
          onChange={handleChange}
        >
          <option>Seleccione</option>
          <option>Medellín</option>
          <option>Bogotá</option>
          <option>Cali</option>
          <option>Cúcuta</option>
        </select>

        <br /><br />

        <label htmlFor="birthday">Fecha de nacimiento</label>
        <input
          type="date"
          id="birthday"
          className="campo-nacimiento"
          value={form.birthday}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          className="campo-correo"
          value={form.correo}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="celular">Celular</label>
        <input
          type="text"
          id="celular"
          className="campo-celular"
          value={form.celular}
          onChange={handleChange}
          onKeyPress={soloNumeros}
        />

        <br /><br />

        <button type="button" id="save" disabled={enEdicion} onClick={handleGuardar}>
          Guardar
        </button>

        <button type="button" id="update" disabled={!enEdicion} onClick={handleActualizar}>
          Actualizar
        </button>

        {enEdicion && (
          <button type="button" onClick={limpiarFormulario}>
            Cancelar edición
          </button>
        )}
      </form>

      <table id="tablaDatos" border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Tipo Documento</th>
            <th>Número de Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Fecha de nacimiento</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaBody">
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.documento}</td>
              <td>{persona.numeroDocumento}</td>
              <td>{persona.name}</td>
              <td>{persona.lastName}</td>
              <td>{persona.address}</td>
              <td>{persona.ciudad}</td>
              <td>{persona.birthday}</td>
              <td>{persona.correo}</td>
              <td>{persona.celular}</td>
              <td className="acciones">
                <button type="button" onClick={() => handleCargarParaEditar(persona)}>
                  Actualizar
                </button>
                <button type="button" onClick={() => handleEliminar(persona)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
