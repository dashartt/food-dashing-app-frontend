import moment from "moment";

const StringMask = require("string-mask");

// Format currency  -------------------->
export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

// Format date  -------------------->
export const formatDate = (value: string) => moment(value).format("DD/MM/YY");

// Format phone -------------------->
export const formatterPhone = new StringMask("(00) 00000-0000");
export const formatPhone = (value: string) => formatterPhone.apply(value);

export const formatMetersToKilometers = (number: number) =>
  Number((number / 1000).toFixed(2));
