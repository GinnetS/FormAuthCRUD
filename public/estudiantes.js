const form = document.getElementById('estudiante-form');
const table = document.getElementById('estudiantes-table');
const apiUrl = '/api/form';

function loadEstudiantes() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach(est => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${est.nombre}</td>
          <td>${est.edad}</td>
          <td>${est.carrera}</td>
          <td>${est.ciudad}</td>
          <td>${est.estado}</td>
          <td>
            <button onclick='editEstudiante(${JSON.stringify(est)})'>✏️</button>
            <button onclick='deleteEstudiante(${est.id})'>🗑️</button>
          </td>
        `;
        table.appendChild(row);
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const estudiante = {
    nombre: form.nombre.value,
    edad: Number(form.edad.value),
    carrera: form.carrera.value,
    ciudad: form.ciudad.value,
    estado: form.estado.value
  };

  const id = form.id.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id ? { ...estudiante, id } : estudiante)
  }).then(() => {
    form.reset();
    loadEstudiantes();
  });
});

function editEstudiante(est) {
  form.id.value = est.id;
  form.nombre.value = est.nombre;
  form.edad.value = est.edad;
  form.carrera.value = est.carrera;
  form.ciudad.value = est.ciudad;
  form.estado.value = est.estado;
}

function deleteEstudiante(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => loadEstudiantes());
}

loadEstudiantes();
