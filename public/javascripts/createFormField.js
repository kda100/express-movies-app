module.exports = function (formFieldName, type, options = {}) {
    const hasPattern = typeof options.pattern !== "undefined";
    const readOnly = typeof options.readOnly !== "undefined";

    return `<div class="mb-3">
        <label class="form-label" for="${formFieldName}">${`${formFieldName[0].toUpperCase()}${formFieldName.substring(1)}`}</label>
        <input class="form-control" type="${type}" id="${formFieldName}" name="${formFieldName}" required ${hasPattern ? "pattern = " + options.pattern : ""} 
        value="${options.initialValue || ""}" ${readOnly ? "readonly" : ""} autofocus />
        <div class="valid-feedback">
            ${options.validMessage || "Looks good!"}
        </div>
        <div class="invalid-feedback">
            ${options.errorMessage || "Invalid " + formFieldName}
        </div>
    </div>`;
};