import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Recipe from "../models/Recipe";
import {useDebounce} from "use-debounce";
import axios from "axios";
import {useSnackbar} from "notistack";

const RecipeContext = createContext<{
    filter: string
    setFilter: (e: string) => void,
    recipes: Recipe[]
    refreshPersonal: () => void
}>({
    filter: "",
    setFilter: () => {
    },
    recipes: [],
    refreshPersonal: () => {
    }
})

export default function useRecipes() {
    return useContext(RecipeContext)
}

export function RecipeProvider(props: { children: ReactNode }) {
    const {enqueueSnackbar} = useSnackbar()
    const [hasLoadedPersonal, setHasLoadedPersonal] = useState(false)
    const [defaultRecipes, setDefaultRecipes] = useState<Recipe[]>([])
    const [filter, setFilter] = useState("")
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [value] = useDebounce(filter, 500)

    useEffect(() => {
        if (isValidFilter(value)) {
            axios
                .get<Recipe[]>(`/recipe?filter=${value}`)
                .then(res => {
                    setRecipes(res.data)
                })
                .catch(err => enqueueSnackbar(err.message, {variant: "error"}))
        } else { // default page
            setRecipes(defaultRecipes)
        }
    }, [value, enqueueSnackbar, defaultRecipes])

    useEffect(() => {
        if (defaultRecipes.length === 0 && !hasLoadedPersonal) {
            axios
                .get<Recipe[]>(`/recipe/personal`)
                .then(res => {
                    setDefaultRecipes(res.data)
                    setHasLoadedPersonal(true)
                })
                .catch(err => console.error(err.message, {variant: "error"}))
        }
    }, [defaultRecipes, hasLoadedPersonal])

    function refreshPersonal() {
        setHasLoadedPersonal(false)
    }

    return <RecipeContext.Provider value={{filter, setFilter, recipes, refreshPersonal}}>
        {props.children}
    </RecipeContext.Provider>
}

function isValidFilter(filter: string) {
    return filter.length > 2
}