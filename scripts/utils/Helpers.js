/**
 * Capitalize first letter
 * @param {string} string
 * @returns {string}
 */
const manageUpperFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Prevent XSS injection by replacing HTML tags into forms
 * @param {string} input
 * @returns {string}
 */
function sanitize(input) {
  return input.replace(/<[^>]*>/g, '');
}

export { manageUpperFirstLetter, sanitize };
