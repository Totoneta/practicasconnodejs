import { connect } from "mongoose";

const MONGO_URL = process.env.MONGO_URL;


export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
    } catch (e) {
        throw new Error(e);
    }
};