import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://tracking.bosta.co/shipments/track/";

export const shipmentApi = createApi({
  reducerPath: "shipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getShipment: builder.query({
      query: (trackingNumber) => `${trackingNumber}`,
    }),
  }),
});

export const { useGetShipmentQuery } = shipmentApi;
