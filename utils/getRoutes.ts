import { Router } from "express";
import fs from "fs";
import path from "path";
import { NestedArray } from "../types/NestedArray";
import { Route } from "../types/Route";

// Recursively reads files in subdirectories and returns their routes
const readDirRec = async (routes: string[]): Promise<NestedArray<Route>> => {
    return Promise.all(
        routes.map(async (route) => {
            // If current route is subdirectory
            if (fs.lstatSync(path.join(__dirname, "..", "routes", route)).isDirectory()) {
                const files = fs.readdirSync(path.join(__dirname, "..", "routes", route))
                    .filter((file: String) => !file.includes('.map')) // Filter out .map files
                    .map(file => path.join(route, file)); // adds directory route to file name

                return readDirRec(files);
            }
            // If current route is file
            else {
                return ({
                    name: route.includes("index.")
                        ? route.substr(0, route.indexOf('index.')).replace(/\\/, "/")
                        : route.substr(0, route.indexOf('.')).replace(/\\/, "/"),
                    router: (await import(`../routes/${route.substr(0, route.indexOf('.'))}`)).default as Router
                } as Route)
            }
        })
    )
}

const getRoutes = async (): Promise<NestedArray<Route>> => {

    // Read all files inside the folder
    const files = fs.readdirSync(path.join(__dirname, "..", "routes"))
        .filter((route: String) => !route.includes('.map')) // Filter out .map files

    return readDirRec(files)
}

export default getRoutes;