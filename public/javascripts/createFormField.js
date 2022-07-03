module.exports = function (formFieldName, type, { pattern, initialValue, validMessage, errorMessage, readOnly = false } = {}) {
    const hasPattern = typeof pattern !== "undefined";

    return `<div class="mb-3">
        <label class="form-label" for="${formFieldName}">${`${formFieldName[0].toUpperCase()}${formFieldName.substring(1)}`}</label>
        <input class="form-control" type="${type}" id="${formFieldName}" name="${formFieldName}" required ${hasPattern ? "pattern = " + pattern : ""} 
        value="${initialValue || ""}" ${readOnly ? "readonly" : ""} autofocus />
        <div class="valid-feedback">
            ${validMessage || "Looks good!"}
        </div>
        <div class="invalid-feedback">
            ${errorMessage || "Invalid " + formFieldName}
        </div>
    </div>`;
};