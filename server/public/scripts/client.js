console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method:'GET',
    url: '/koalas'
  })
    .then(function(response){
      renderKoalas(response.data);
    })
    .catch(function(error){
      console.log('Error getting koalas', error)
      alert('Something bad happened')
    })
}

    function renderKoalas(koalas) {
      console.log('Rendering koalas', koalas)
      let koalaTable = document.getElementById('viewKoalas');
      koalaTable.innerHTML = '';
      for (let bear of koalas) {
        if (bear.ready_to_transfer === 'N') {
          koalaTable.innerHTML += `
          <tr>
          <td>${bear.id}</td>
          <td>${bear.name}</td>
          <td>${bear.gender}</td>
          <td>${bear.age}</td>
          <td>${bear.ready_to_transfer} <button onclick="changeReadyStatus(event)">Ready</button></td>
          <td>${bear.notes}</td>
          <td><button onclick="deleteKoala(event)">Delete</button></td>
        </tr>
        `;
        } else {
        koalaTable.innerHTML += `
        <tr>
          <td>${bear.id}</td>
          <td>${bear.name}</td>
          <td>${bear.gender}</td>
          <td>${bear.age}</td>
          <td>${bear.ready_to_transfer}</td> 
          <td>${bear.notes}</td>
          <td><button onclick="deleteKoala(event)">Delete</button></td>
        </tr>
        `;
      }
    }
} // end getKoalas

function saveKoala(event){
  event.preventDefault();
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
  let koalaName=document.querySelector('#nameIn');
  let koalaAge=document.querySelector('#ageIn');
  let koalaGender=document.querySelector('#genderIn');
  let koalaReady=document.querySelector('#readyForTransferIn');
  let koalaNotes=document.querySelector('#notesIn');

  let newKoala={
        id: null,
        name: koalaName.value,
        gender: koalaGender.value,
        age: koalaAge.value,
        ready_to_transfer: koalaReady.value,
        notes: koalaNotes.value,
  }
  console.log('Sending koala to server');
  axios({
    method: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then(function(response){
    console.log('koala added');

    koalaName.value='';
    koalaAge.value='';
    koalaGender.value='';
    koalaReady.value='';
    koalaNotes.value='';

    getKoalas();
  });
};
// function changeReadyStatus(event){
//   const cell = event.target.closest('td');
//   cell.innerHTML='Y';
//   //this changes the value on the dom but not the data in the array on the server
// }

function changeReadyStatus(event){
  const cell = event.target.closest('td');
  const koalaId = cell.parentElement.querySelector('td:first-child').textContent; 

  axios.put(`/koalas/${koalaId}`)
  .then((response) => {
    console.log(response.data)
    getKoalas();
})
.catch((error) => {
  console.log('error updating koala status:', error);
});


};
function deleteKoala(event){
  const cell = event.target.closest('tr');
  const koalaId = cell.querySelector('td:first-child').textContent; // Assuming the ID is in the first column

  axios.delete(`/koalas/${koalaId}/`)
    .then((response) =>{
      console.log('Koala deleted successfully:', response.data);
      getKoalas();
    })
    .catch((error) => {
      console.error('Error deleting koala:', error)
    });
  }


getKoalas();
