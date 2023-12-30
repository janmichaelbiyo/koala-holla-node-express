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

    function renderKoalas(koalas) {
      console.log('Rendering koalas', koalas)
      let koalaTable = document.getElementById('viewKoalas');
      koalaTable.innerHTML = '';
      for (let bear of koalas) {
        koalaTable.innerHTML += `
        <tr>
          <td>${bear.id}</td>
          <td>${bear.name}</td>
          <td>${bear.gender}</td>
          <td>${bear.age}</td>
          <td>${bear.ready_to_transfer}</td>
          <td>${bear.notes}</td>
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

  
}

getKoalas();

