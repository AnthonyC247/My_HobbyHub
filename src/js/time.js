export const getElapsedTime = (timeCreated) => {
    const timeInMs = new Date() - new Date(timeCreated);
    const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor(timeInMs / (1000 * 60));
    const seconds = Math.floor(timeInMs / 1000);
    
    // assemble the output string
    let outputString = "";
    if (days > 0) {
        outputString = `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
        outputString = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        outputString = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (seconds > 0){
        outputString = `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
    return outputString
}