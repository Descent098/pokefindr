async function getPokemon(id=""){
    if (!id){
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        id = parameters.get('id');
    }
    
    pokemonData = {
        name:"",
        image:"",
        id:id,
        description:""
    }
    
    // Documentation https://pokeapi.co/docs/v2#pokemon-species
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((response) => response.json())
          .then((data) => {
        
            pokemonData.description = data.flavor_text_entries[0].flavor_text.toString()
            
          }
        )
    
    // Documentation: https://pokeapi.co/docs/v2#pokemon
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
          .then((data) => {
        
            pokemonData.image = data.sprites.other["official-artwork"].front_default
            pokemonData.name = data.name
            console.log(data.name)
            
          }
        )
    return pokemonData
}

async function loadData(){
    pokeData = await getPokemon()
    console.log("input data", pokeData)
    console.log("name", pokeData.name)
    console.log("id", pokeData.name)
    console.log("image", pokeData.name)
    console.log("description", pokeData.name)
    
    document.getElementById("pokemon-name").innerHTML = pokeData.name
    document.getElementById("pokemon-image").src = pokeData.image
    document.getElementById("pokemon-description").innerHTML = pokeData.description
    document.getElementById("pokemon-id").innerHTML= `#${pokeData.id}`
    document.getElementById("bulbapedia-link").href= `https://bulbapedia.bulbagarden.net/wiki/${pokeData.name}`
}