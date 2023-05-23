import {Item} from "./Item";
import UserEntity from "./UserEntity";

export default interface Recipe {
    id: number
    title: string
    items: RecipeItem[] | null
    creator: UserEntity
}

export interface RecipeItem {
    id: number
    quantity: number
    item: Item
}
