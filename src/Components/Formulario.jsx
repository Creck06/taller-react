import React from "react";
import { nanoid } from "nanoid";
import swal from "sweetalert"
import { firebase } from './firebase'

const Formulario = () => {
  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [horario, setHorario] = React.useState("");
  const [salario, setSalario] = React.useState("");
  const [id, setId] = React.useState("")
  const [listaLocutores, setListaLocutores] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('locutores').get()
        const arrayData = data.docs.map(doc => (
          { id: doc.id, ...doc.data() }
        ))
        //console.log(arrayData)
        setListaLocutores(arrayData)
      } catch (error) {

      }
    }
    obtenerDatos();
  })

  const guardarEmpleado = async (e) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError('Digite el nombre')
      return
    }
    if (!cedula.trim()) {
      setError('Digite la cedula')
      return
    }
    if (!fecha.trim()) {
      setError('Digite la fecha de nacimiento')
      return
    }
    if (!telefono.trim()) {
      setError('Digite el telefono')
      return
    }
    if (!correo.trim()) {
      setError('Digite el correo')
      return
    }
    if (!horario.trim()) {
      setError('Digite el horario')
      return
    }
    if (!salario.trim()) {
      setError('Digite el salario')
      return
    }

    try {
      swal({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 700
      })
      const db = firebase.firestore()
      const nuevoEmpleado = {
        atribNombre: nombre, atribCedula: cedula, atribFecha: fecha, atribTelefono: telefono, atribCorreo: correo, atribHorario: horario, atribSalario: salario
      }
      await db.collection('locutores').add(nuevoEmpleado)

      setListaLocutores([
        ...listaLocutores,
        { id: nanoid(), atribNombre: nombre, atribCedula: cedula, atribFecha: fecha, atribTelefono: telefono, atribCorreo: correo, atribHorario: horario, atribSalario: salario }
      ])

      e.target.reset()
      setNombre('')
      setCedula('')
      setFecha('')
      setTelefono('')
      setCorreo('')
      setHorario('')
      setSalario('')
      setError(null)

    } catch (error) {
      console.log(error)
    }
  }

  const editar = item => {
    setId(item.id)
    setNombre(item.atribNombre)
    setCedula(item.atribCedula)
    setFecha(item.atribEdad)
    setTelefono(item.atribEmail)
    setCorreo(item.atribTelefono)
    setHorario(item.atribTiempo)
    setSalario(item.atribSalario)
    setModoEdicion(true)
    setError(null)
  }

  const editarEmpleado = async e => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError('Digite el nombre')
      return
    }
    if (!cedula.trim()) {
      setError('Digite la cedula')
      return
    }
    if (!fecha.trim()) {
      setError('Digite la fecha de nacimiento')
      return
    }
    if (!telefono.trim()) {
      setError('Digite el telefono')
      return
    }
    if (!correo.trim()) {
      setError('Digite el correo')
      return
    }
    if (!horario.trim()) {
      setError('Digite el horario')
      return
    }
    if (!salario.trim()) {
      setError('Digite el salario')
      return
    }

    try {
      const db = firebase.firestore()
      await db.collection('locutores').doc(id).update({
        atribNombre: nombre, atribCedula: cedula, atribFecha: fecha, atribTelefono: telefono, atribCorreo: correo, atribHorario: horario, atribSalario: salario
      })
      const arrayEditado = listaLocutores.map(
        item => item.id === id ? { id: id, atribNombre: nombre, atribCedula: cedula, atribFecha: fecha, atribTelefono: telefono, atribCorreo: correo, atribHorario: horario, atribSalario: salario } : item
      )
      setListaLocutores(arrayEditado)
      setId('')
      setNombre('')
      setCedula('')
      setFecha('')
      setTelefono('')
      setCorreo('')
      setHorario('')
      setSalario('')
      setModoEdicion(false)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminar = id => {
    swal({
      title: '¿Estás seguro?',
      text: "No podrás deshacer esta acción.",
      icon: 'warning',
      buttons: ["No", "Sí"]
    }).then(async (result) => {
      if (result) {
        try {
          const db = firebase.firestore()
          await db.collection('locutores').doc(id).delete()
          const aux = listaLocutores.filter(item => item.id !== id)
          setListaLocutores(aux)
        } catch (error) {
          console.log(error)
        }
        swal({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminado',
          showConfirmButton: false,
          timer: 700
        })
      }
    })
  }

  const cancelar = () => {
    setModoEdicion(false)
    setId('')
    setNombre('')
    setCedula('')
    setFecha('')
    setTelefono('')
    setCorreo('')
    setHorario('')
    setSalario('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Locutores - Olímpica Estereo</h1>
      <hr />
      <form onSubmit={modoEdicion ? editarEmpleado : guardarEmpleado} className="text-center">
        {
          error ? <span className="text-danger">{error}</span> : null
        }
        <input className="form-control mb-2" type="text" placeholder="Ingrese Nombre"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Cedula"
          onChange={(e) => setCedula(e.target.value)}
          value={cedula}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Fecha de Nacimiento"
          onChange={(e) => setFecha(e.target.value)}
          value={fecha}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Teléfono"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Correo"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Horario"
          onChange={(e) => setHorario(e.target.value)}
          value={horario}
        />
        <input className="form-control mb-2" type="text" placeholder="Ingrese Salario"
          onChange={(e) => setSalario(e.target.value)}
          value={salario}
        />
        {
          modoEdicion ?
            (
              <>
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
                <button className="btn btn-dark btn-block" onClick={() => cancelar}>Cancelar</button>
              </>
            )
            :
            <button className="btn btn-primary btn-block" type="submit">Agregar</button>
        }

      </form>

      <div className="row mt-5">
        <div className="col-12">
          <h4 className="text-center">Listado de Locutores</h4>
          <ul className="list-group">
            {
              listaLocutores.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.atribNombre} - {item.atribCedula} - {item.atribFecha} - {item.atribTelefono} - {item.atribCorreo} - {item.atribHorario} - {item.atribSalario}</span>
                  <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button className="btn btn-warning btn-sm float-end mx-2" onClick={() => editar(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
