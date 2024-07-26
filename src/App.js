import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';

function App() {
	const initialURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=21';
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState([]);
	const [nextUrl, setNextUrl] = useState('');
	const [PrevUrl, setPrevUrl] = useState('');
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		const fetchPokemonData = async () => {
			let res = await getAllPokemon(initialURL);
			loadPokemon(res.results);
			setNextUrl(res.next);
			setLoading(false);
		};
		fetchPokemonData();
	}, []);

	const loadPokemon = async (data) => {
		let _pokemonData = await Promise.all(
			data.map((pokemon) => {
				let pokemonRecord = getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemonData);
	};

	const handleNextPage = async () => {
		setLoading(true);
		let res = await getAllPokemon(nextUrl);
		loadPokemon(res.results);
		setNextUrl(res.next);
		setPrevUrl(res.previous);
		setPageCount(pageCount + 1);
		console.log(res);
		setLoading(false);
	};
	const handlePrevPage = async () => {
		setLoading(true);
		let res = await getAllPokemon(PrevUrl);
		loadPokemon(res.results);
		setNextUrl(res.next);
		setPrevUrl(res.previous);
		setPageCount(pageCount - 1);
		setLoading(false);
	};

	return (
		<>
			<Navbar />
			<div className='text-center w-full bg-slate-300'>
				{loading ? (
					<div className='h-screen pt-10'>ろーでぃんぐ中...</div>
				) : (
					<>
						<div className='grid md:grid-cols-3 grid-cols-1 gap-5 pt-5 place-items-center pb-5'>
							{pokemonData.map((pokemon, i) => {
								return <Card key={i} pokemon={pokemon} />;
							})}
						</div>
						<div className='pb-5'>
							{pageCount ? (
								<button
									className='bg-slate-500 rounded px-3 text-white mr-2 transition duration-300 hover:bg-slate-200 hover:text-gray-500 hover:border hover:border-gray-400'
									onClick={handlePrevPage}
								>
									前へ
								</button>
							) : (
								<button className='bg-slate-400 rounded px-3 text-white mr-2'>前へ</button>
							)}
							<button
								className='bg-slate-500 rounded px-3 text-white ml-2 transition duration-300 hover:bg-slate-200 hover:text-gray-500 hover:border hover:border-gray-400'
								onClick={handleNextPage}
							>
								次へ
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
