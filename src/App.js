import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function App() {
  const eliminar = <FontAwesomeIcon icon={faTrashCan} />;
  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);

  
  const createUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/LuizzKro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };


const getTask=()=>{
  fetch("https://assets.breatheco.de/apis/fake/todos/user/LuizzKro")
  .then((response) => response.json()) 
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
}


  const obtenerTodoList=(nuevasTareas)=> {
   
    fetch("https://assets.breatheco.de/apis/fake/todos/user/LuizzKro", {
      
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevasTareas),
    })
      .then((response) => response.json()) 
      .then((data) => console.log(data)) 
      .catch((error) => console.log(error));
   
    } 

 
  const deletehall =()=>{
    setTareas([])
    fetch("https://assets.breatheco.de/apis/fake/todos/user/LuizzKro",{
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify([])
  })
  .then(response=>response.json ())
  .then(data=>console.log(data))
  .catch(error=>console.log(error))
    }
  
    useEffect(() => {
      createUser()
      getTask();
   
    }, []);

  return (
    <div className=" cuerpo d-flex justify-content-center mt-5 ">
      <div className="card" style={{ width: 800 }}>
        <h1 style={{ textAlign: "center" }}>LISTA DE TAREAS</h1>
        <input
          type="text"
          placeholder="Agregar tareas"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setTareas(tareas.concat({label: inputValue, done: false}));
              setInputValue("")
              obtenerTodoList(tareas.concat({label: inputValue, done: false}));
            }
          }}
        />
        <ul className="list-group list-group-flush borde">
          {tareas.map((item, index) => (
            <li key={index}  className="lista list-group-item d-flex justify-content-between">
              <p>
                {item.label}
                {""}
              </p>
              <button
                className="btn-delete "
                onClick={() =>
                  setTareas(
                    tareas.filter((t, currentIndex) => index != currentIndex)
                  )
                }
              >
                {eliminar}
              </button>
            </li>
          ))}
        </ul>
        <div className="card-footer " >
          {" "}
          <p className="d-flex justify-content-center">{tareas.length} Tareas pendientes</p>
          <button className="btn btn-outline-danger w-100 " onClick={deletehall}>Borrar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
