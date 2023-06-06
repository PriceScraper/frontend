import {TrackedItem} from "../models/TrackedItem";
import {Item} from "../models/Item";
import {getShopNameFromDomain} from "./shop.util";
import {ItemPrice} from "../models/ItemPrice";
import {max, mean} from "./number.util";

export function findTrackedItemWithLowestPrice(trackedItems: TrackedItem[]) {
    if (trackedItems.length === 0)
        throw new Error("can't find lowest price of empty tracked items array");
    return trackedItems.reduce((prev, current) => {
        if (current.itemPrices.length === 0)
            throw new Error("can't lowest price of empty prices array");
        return prev.itemPrices[0].price <= current.itemPrices[0].price
            ? prev
            : current;
    });
}

export function getWhiteListedTrackedItemsForItem(
    item: Item,
    whiteListedShops: string[]
) {
    return item.trackedItems.filter((trackedItem) =>
        whiteListedShops.includes(getShopNameFromDomain(trackedItem.shop.name))
    );
}

export function limitShops(trackedItems: TrackedItem[]) {
    let items: TrackedItem[] = []
    trackedItems.forEach(ti => {
        if (items.filter(a => a.shop.id === ti.shop.id).length === 0) {
            items.push(ti)
        }
    })
    return items
}

export function sortTrackedItemOnPriceAsc(a: TrackedItem, b: TrackedItem) {
    return orderedPrices(a.itemPrices).reverse()[0].price - orderedPrices(b.itemPrices).reverse()[0].price
}

export function pricePercentageOnAvg(price: number, items: TrackedItem[]) {
    const avg = mean(items
        .map(ti => orderedPrices(ti.itemPrices).reverse()[0].price))
    const perc = (price / avg) * 100
    if (perc > 100) return 100
    if (perc < 0) return 0
    return perc
}


export function pricePercentageOnMax(price: number, items: TrackedItem[]) {
    const prices = items.map(ti => orderedPrices(ti.itemPrices).reverse()[0].price)
    const maxPrice = max(prices)
    if (maxPrice === 0) return price
    const perc = (price / maxPrice) * 100
    if (perc > 100) return 100
    if (perc < 0) return 0
    return perc
}

export function shortenNameIfTooLong(name: string) {
    const useLength = 25
    if (name.length < useLength) return name
    name = name.replace("Carrefour", "")
    name = name.replace("AH", "")
    if (name.length < useLength) return name
    return `${name.substring(0, useLength - 3)}...`
}

export function orderedPrices(prices: ItemPrice[]) {
    return prices
        .sort(sortPriceByDateAsc)
}

export function sortPriceByDateAsc(a: ItemPrice, b: ItemPrice): number {
    if (new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime()) return 1
    if (new Date(a.timestamp).getTime() < new Date(b.timestamp).getTime()) return -1
    return 0
}

export function onePricePerDay(list: ItemPrice[]) {
    let prices: ItemPrice[] = []
    list.forEach(price => {
        if (prices.filter(e => e.timestamp.substring(0, 10) === price.timestamp.substring(0, 10)).length === 0) {
            prices.push(price)
        }
    })
    return prices
}