module.exports = (input) => {
    const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escapedInput
}