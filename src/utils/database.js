import { openDatabase } from "expo-sqlite";

const db = openDatabase("EasyScan.db");

const initDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY NOT NULL, 
        is_in_history BOOLEAN, 
        is_favorite BOOLEAN);`,
            [],
            () => console.log("Database initialized !"),
            (_, error) =>
                console.error(
                    `SQLite - database initalization error : ${error}`
                )
        );
    });
};

const insertProduct = (id_product, is_in_history, is_favorite) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT OR REPLACE INTO Products (
        id, 
        is_in_history, 
        is_favorite) values (?, ?, ?);`,
            [id_product, is_in_history, is_favorite],
            (_, { rows: { _array } }) => console.log(JSON.stringify(_array)),
            (_, error) =>
                console.error(
                    `SQLite - error when inserting new product: ${error}`
                )
        );
    });
};

const getProductsHistory = (getProductMethod) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM Products WHERE is_in_history = 1`,
            [],
            (_, { rows: { _array } }) => getProductMethod(_array),
            (_, error) =>
                console.error(
                    `SQLite - error fetching products from history : ${error}`
                )
        );
    });
};

const getProductsFavorites = (getProductMethod) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM Products WHERE is_favorite = 1`,
            [],
            (_, { rows: { _array } }) => getProductMethod(_array),
            (_, error) =>
                console.error(
                    `SQLite - error fetching products from favorites : ${error}`
                )
        );
    });
};

const getProducts = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM Products`,
            [],
            (_, { rows: { _array } }) => console.log(_array),
            (_, error) =>
                console.error(
                    `SQLite - error fetching products from history : ${error}`
                )
        );
    });
};

const setProductFavorite = (id_product, state) => {
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE Products SET is_favorite = ? WHERE id = ?`,
            [state, id_product],
            (_, { rows: { _array } }) => console.log(state),
            (_, error) =>
                console.error(
                    `SQLite - error updating to favorite product : ${error}`
                )
        );
    });
};

const getProductFavoriteState = (id_product, getFavoriteState) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT is_favorite FROM Products WHERE id = ?`,
            [id_product],
            (_, { rows: { _array } }) => getFavoriteState(_array),
            (_, error) =>
                console.error(
                    `SQLite - error fetching products from history : ${error}`
                )
        );
    });
};

const clearHistory = () => {
    db.transaction((tx) =>
        tx.executeSql("DELETE FROM Products WHERE is_in_history = 1")
    );
};

export {
    initDatabase,
    insertProduct,
    getProductsHistory,
    getProductsFavorites,
    setProductFavorite,
    getProductFavoriteState,
    getProducts,
    clearHistory,
};
