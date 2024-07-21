export const getAllPokemon = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

export const getPokemon = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then(async (data) => {
				const data2 = await getPokemonData(data.species.url);
				const data3 = await getPokemonType(data);
				resolve({
					pokemon1: data,
					pokemon2: data2,
					types: data3,
				});
			});
	});
};

const getPokemonData = (data) => {
	return new Promise((resolve, reject) => {
		fetch(data)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

const getPokemonType = async (data) => {
	let pokeType = await Promise.all(
		data.types.map((data) => {
			return getPokemonData(data.type.url);
		})
	);
	return pokeType;
};
