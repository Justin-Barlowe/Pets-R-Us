document.getElementById('lookup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
  
    fetch(`/api/appointments/${email}`)
      .then(response => response.json())
      .then(appointments => {
        let html = '';
  
        appointments.forEach(appointment => {
          html += `<div>
            <h2>${appointment.service}</h2>
            <p>Username: ${appointment.userName}</p>
            <p>Name: ${appointment.firstName} ${appointment.lastName}</p>
            <p>Email: ${appointment.email}</p>
          </div>`;
        });
  
        document.getElementById('appointments').innerHTML = html;
      })
      .catch(error => console.error('Error:', error));
  });
  