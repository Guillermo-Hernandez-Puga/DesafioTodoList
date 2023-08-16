const entradaTarea = document.getElementById("InputTarea");
    const botonAgregarTarea = document.getElementById("ButtonAgregarTareas");
    const listaTareas = document.getElementById("ListaTareas");
    const contadorTareasCompletadas = document.getElementById("TareasRealizadas");

    let tareas = [
      { id: 1, descripcion: "Cortar el Pasto", completada: false },
      { id: 2, descripcion: "Sacar la Basura", completada: false },
      { id: 3, descripcion: "Realizar las compras", completada: false }
    ];
    

    function actualizarListaTareas() {
      const cuerpoTablaTareas = document.getElementById("CuerpoTablaTareas");
      cuerpoTablaTareas.innerHTML = "";
      
      tareas.forEach((tarea, indice) => {
        const filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
          <td>${tarea.id}</td>
          <td>${tarea.descripcion}</td>
          <td>
            <input type="checkbox" class="checkbox-tarea" data-id="${tarea.id}" ${tarea.completada ? "checked" : ""}>
          </td>
          <td>
            <button class="botonEliminar" data-indice="${indice}">Eliminar</button>
          </td>
        `;
        cuerpoTablaTareas.appendChild(filaTabla);
      });

      const botonesEliminar = document.querySelectorAll(".botonEliminar");
      botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarTarea);
      });

      const casillasCheckbox = document.querySelectorAll('input[type="checkbox"]');
      casillasCheckbox.forEach(checkbox => {
        checkbox.addEventListener("change", cambiarCompletada);
      });

      actualizarContadorTareas();
      actualizarContadorTareasCompletadas();
    }

    function agregarTarea() {
      const nuevaDescripcionTarea = entradaTarea.value.trim();
    
      if (nuevaDescripcionTarea === "") {
        alert("Por favor, ingresa una tarea.");
        return;
      }
    
      const nuevaTarea = { id: generarId(), descripcion: nuevaDescripcionTarea, completada: false };
      tareas.push(nuevaTarea);
      entradaTarea.value = "";
      actualizarListaTareas();
    }

      function generarId() {
        const id = Math.floor(Math.random() * 100); 
        return id.toString().padStart(2, '0'); 
      }

    function eliminarTarea(evento) {
      const indice = evento.target.getAttribute("data-indice");
      tareas.splice(indice, 1);
      actualizarListaTareas();
    }

    function cambiarCompletada(evento) {
      const id = evento.target.getAttribute("data-id"); 
      const tarea = tareas.find(t => t.id == id);
      tarea.completada = !tarea.completada;
      actualizarContadorTareasCompletadas();
    }
    

    function actualizarContadorTareas() {
      const contadorTareas = document.getElementById("ContadorTareas");
      contadorTareas.textContent = tareas.length;
    }

    function actualizarContadorTareasCompletadas() {
      const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;
      contadorTareasCompletadas.textContent = tareasCompletadas;
    }

    botonAgregarTarea.addEventListener("click", agregarTarea);
    actualizarListaTareas();