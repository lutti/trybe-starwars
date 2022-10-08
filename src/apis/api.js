async function FetchStarWars() {
  const promise = await fetch('https://swapi.dev/api/planets');
  const ObjList = await promise.json();
  return ObjList.results.filter((e) => delete e.residents);
}

export default FetchStarWars;
