import React from 'react';

const Card = ({ pokemon }) => {
	const pokeData = (() => {
		return {
			name: pokemon.pokemon2.names.find((data) => data.language.name === 'ja').name,
			img: pokemon.pokemon1.sprites.front_default,
			poke: pokemon.pokemon2.genera.find((data) => data.language.name === 'ja').genus,
			weight: pokemon.pokemon1.weight,
			height: pokemon.pokemon1.height,
			types: pokemon.types.map((type) => type.names.find((data) => data.language.name === 'ja').name),
		};
	})();

	return (
		<div className='w-64 shadow-[2px_8px_21px_-2px_#777] rounded-xl pb-4 bg-white'>
			<div className='cardImg'>
				<img className='mx-auto' src={pokeData.img} alt='' />
			</div>
			<h3 className='p-0 text-2xl mb-2 mt-0'>{pokeData.name}</h3>
			<h3 className='cardN'>{pokeData.poke}</h3>
			<div className='flex justify-center'>
				<div>タイプ: </div>
				{pokeData.types.map((type) => {
					return (
						<div>
							<span className='ml-2'>{type}</span>
						</div>
					);
				})}
			</div>
			<div className='cardInfo'>
				<div className='cardData'>
					<p className='title'>{`重さ: ${pokeData.weight / 10}kg`}</p>
				</div>
				<div className='cardData'>
					<p className='title'>{`高さ: ${pokeData.height / 10}m`}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
