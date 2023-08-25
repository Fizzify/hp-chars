import { useQuery } from "@tanstack/react-query";

const getCharacters = async () => {
  const res = await fetch("https://hp-api.onrender.com/api/characters", {
    method: "GET",
  });

  if (res.ok) {
    return res.json();
  }

  return Promise.reject("Failed");
};

type Wand = {
  wood: string;
  core: string;
  length: number;
};

type Character = {
  id: string;
  name: string;
  alterate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternative_actors?: string;
  alive: boolean;
  image: string;
};

function App() {
  const { data: charsData, isLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!charsData) {
    return <div>error</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Harry Potter Characters</h1>
      {((charsData as Character[]) && (charsData as Character[])).map(
        (character) => {
          return <div key={character.id}>{character.name}</div>;
        }
      )}
    </div>
  );
}

export default App;
