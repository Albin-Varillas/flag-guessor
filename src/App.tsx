import { useEffect, useState } from "react"
import type { Country } from "./types/Country"

function App() {
    const [countries, setCountries] = useState<Country[]>([])
    const [country, setCountry] = useState<Country | null>(null)
    const [input, setInput] = useState("")
    const [isWinner, setIsWinner] = useState(false)
    const continents = ["europe", "asia", "africa"] as const
    const [selectedContinent, setSelectedContinent] =
        useState<typeof continents[number]>("europe")

    useEffect(() => {
        async function getCountries() {
            const res = await fetch(
                "https://restcountries.com/v3.1/region/" + selectedContinent
            )
            const data = await res.json()
            setCountries(data)
        }
        getCountries()
    }, [selectedContinent])

    useEffect(() => {
        getRandomCountry()
    }, [countries])

    function getRandomCountry() {
        const maxlength = countries.length
        const randomIndex = Math.floor(Math.random() * maxlength)
        setCountry(countries[randomIndex])
    }

    function getHint() {
        setInput(country?.name.common.substring(0, 3) || "")
    }

    function guessCountry() {
        if (input.toLowerCase() === country?.name.common.toLowerCase()) {
            getRandomCountry()
            setInput("")
            setIsWinner(true)
        } else {
            setIsWinner(false)
        }
    }

    return (
        <div className="App">
            {selectedContinent}
            <div>
                {continents.map((continent) => (
                    <button
                        onClick={() => {
                            setSelectedContinent(continent)
                        }}
                    >
                        {continent}
                    </button>
                ))}
            </div>
            {country && <img src={country.flags.png} alt="flag-png" />}
            <div>
                <input
                    type="text"
                    placeholder="guess country..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={() => guessCountry()}>Guess country</button>
                <button onClick={() => getHint()}>Get hint</button>
                <p>
                    {isWinner
                        ? "Wow, du är smart"
                        : "Oj, plugga lite är du snäll..."}
                </p>
            </div>
            <button onClick={() => getRandomCountry()}>New Country</button>
        </div>
    )
}

export default App
