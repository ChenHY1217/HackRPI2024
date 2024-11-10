import { apiSlice } from "./apiSlice";
import { ALERTS_URL } from "../constants";

export const alertApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAlerts: builder.query<any, void>({
            query: () => ({
                url: `${ALERTS_URL}/all`,
                method: "GET",
            }),
        }),

        getAllPersonalAlerts: builder.query<any, void>({
            query: () => ({
                url: `${ALERTS_URL}/personal`,
                method: "GET",
            }),
        }),

        createAlert: builder.mutation<any, any>({
            query: (body) => ({
                url: `${ALERTS_URL}/create`,
                method: "POST",
                body,
            }),
        }),

        updateAlert: builder.mutation<any, { id: string; [key: string]: any }>({
            query: ({ id, ...body }) => ({
                url: `${ALERTS_URL}/${id}`,
                method: "PUT",
                body,
            }),
        }),

        deleteAlert: builder.mutation<any, string>({
            query: (id) => ({
                url: `${ALERTS_URL}/${id}`,
                method: "DELETE",
            }),
        }),

        getAlertById: builder.query<any, string>({
            query: (id) => ({
                url: `${ALERTS_URL}/${id}`,
                method: "GET",
            }),
        }),
        
        getFilteredAlerts: builder.query<any, { type?: string; dangerLevel?: number; location?: string; time?: string }>({
            query: ({ type, dangerLevel = 0, location, time }) => ({
                url: `${ALERTS_URL}/filter`,
                method: "GET",
                params: { type, dangerLevel, location, time },
            }),
        }),
        
    }),
});