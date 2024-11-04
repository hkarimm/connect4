// Creating a prompt that other files can import
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
export default prompt;
