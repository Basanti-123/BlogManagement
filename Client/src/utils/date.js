import moment from "moment";

const dateFormatter = (date) => {
    return moment(date).format("ll")
};
export const dateInput = (date) => {
   return moment(date).format("yyyy-MM-DD");
}

export const dateOutput = (date) => {
    return moment(date).format();
 }

export default dateFormatter