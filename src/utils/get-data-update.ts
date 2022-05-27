export default function getDataUpdate(fieldsUpdate: {}, updatedData: {}) {
    for (const key in fieldsUpdate) {
        if (fieldsUpdate[key]) {
            updatedData[key] = fieldsUpdate[key];
        }
    }
    return updatedData;
}