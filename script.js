const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const morseMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---",
  3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----."
};
const reverseMorseMap = Object.fromEntries(Object.entries(morseMap).map(([key, value]) => [value, key]));

const blockDefinitions = [
  // Events: only the two start-style blocks are shown to students.
  {
    type: "event_input",
    category: "Events",
    subcategory: "Start blocks",
    title: "When Run clicked, set starting message to",
    description: "Starts the program with a typed plain text message.",
    fields: [{ name: "message", type: "text", value: "HELLO CYBER CLUB" }]
  },
  {
    type: "event_prompt",
    category: "Events",
    subcategory: "Start blocks",
    title: "When Run clicked, ask student for message",
    description: "Starts the program by asking the student to type a message.",
    fields: []
  },

  // Text preparation.
  {
    type: "text_uppercase",
    category: "Text",
    subcategory: "Clean the message",
    title: "Make message UPPERCASE",
    description: "Changes lowercase letters into uppercase letters so A-Z ciphers work clearly.",
    fields: []
  },
  {
    type: "text_remove_spaces",
    category: "Text",
    subcategory: "Clean the message",
    title: "Remove spaces",
    description: "Deletes spaces from the current message.",
    fields: []
  },
  {
    type: "text_add_prefix",
    category: "Text",
    subcategory: "Join text",
    title: "Add secret prefix",
    description: "Adds text at the front of the message.",
    fields: [{ name: "prefix", type: "text", value: "LOCK-" }]
  },

  // Lists / arrays / tables.
  {
    type: "array_alphabet",
    category: "Lists",
    subcategory: "Alphabet lists",
    title: "Use alphabet list A-Z",
    description: "Creates the normal alphabet list for position calculations.",
    fields: []
  },
  {
    type: "array_custom",
    category: "Lists",
    subcategory: "Alphabet lists",
    title: "Set scrambled alphabet list",
    description: "Stores a 26-letter substitution list, such as QWERTY...",
    fields: [{ name: "customAlphabet", type: "text", value: "QWERTYUIOPASDFGHJKLZXCVBNM" }]
  },
  {
    type: "array_keyword",
    category: "Lists",
    subcategory: "Alphabet lists",
    title: "Build alphabet list from keyword",
    description: "Creates a substitution list by placing a keyword first, then the missing letters.",
    fields: [{ name: "keyword", type: "text", value: "DRAGON" }]
  },
  {
    type: "list_message_chars",
    category: "Lists",
    subcategory: "Character lists",
    title: "Turn message into character list",
    description: "Splits the message into a list of single characters.",
    fields: []
  },
  {
    type: "list_reverse_chars",
    category: "Lists",
    subcategory: "Character lists",
    title: "Reverse character list",
    description: "Reorders the character list from last to first.",
    fields: []
  },
  {
    type: "list_swap_pairs",
    category: "Lists",
    subcategory: "Character lists",
    title: "Swap neighbours in character list",
    description: "Swaps character 1 with 2, 3 with 4, and so on.",
    fields: []
  },
  {
    type: "list_join_chars_to_message",
    category: "Lists",
    subcategory: "Character lists",
    title: "Join character list into message",
    description: "Turns the character list back into the current message.",
    fields: []
  },
  {
    type: "morse_table",
    category: "Lists",
    subcategory: "Morse tables",
    title: "Use Morse code table",
    description: "Loads the letter-to-dots-and-dashes table.",
    fields: []
  },
  {
    type: "morse_reverse_table",
    category: "Lists",
    subcategory: "Morse tables",
    title: "Use reverse Morse table",
    description: "Loads the dots-and-dashes-to-letter table.",
    fields: []
  },
  {
    type: "token_split_morse",
    category: "Lists",
    subcategory: "Morse tables",
    title: "Split Morse message into code list",
    description: "Splits Morse text by spaces so each code can be decoded one by one.",
    fields: []
  },

  // Variables and keys.
  {
    type: "var_set",
    category: "Variables",
    subcategory: "Storage boxes",
    title: "Set variable",
    description: "Stores a value that other blocks can use later.",
    fields: [
      { name: "varName", type: "select", value: "shift", options: ["shift", "rotor", "key", "rounds", "total"] },
      { name: "varValue", type: "text", value: "3" }
    ]
  },
  {
    type: "var_change",
    category: "Variables",
    subcategory: "Storage boxes",
    title: "Change variable by",
    description: "Adds a number to a stored variable.",
    fields: [
      { name: "varName", type: "select", value: "rotor", options: ["shift", "rotor", "rounds", "total"] },
      { name: "amount", type: "number", value: 1 }
    ]
  },
  {
    type: "key_set_word",
    category: "Variables",
    subcategory: "Build shift from key",
    title: "Set secret key word",
    description: "Stores a key word, such as CAT, before calculating a shift number.",
    fields: [{ name: "keyText", type: "text", value: "CAT" }]
  },
  {
    type: "key_clear_total",
    category: "Variables",
    subcategory: "Build shift from key",
    title: "Set key total to 0",
    description: "Starts the key calculation by clearing the total number.",
    fields: []
  },
  {
    type: "key_letter_value",
    category: "Variables",
    subcategory: "Build shift from key",
    title: "Find key letter value A=1",
    description: "Turns the current key letter into A=1, B=2, ..., Z=26.",
    fields: []
  },
  {
    type: "key_add_letter_value_to_total",
    category: "Variables",
    subcategory: "Build shift from key",
    title: "Add key letter value to total",
    description: "Adds the current key letter value into the running total.",
    fields: []
  },
  {
    type: "key_total_to_shift",
    category: "Variables",
    subcategory: "Build shift from key",
    title: "Set shift = key total mod 26",
    description: "Turns the key total into a usable alphabet shift number.",
    fields: []
  },
  {
    type: "var_key_to_shift",
    category: "Variables",
    subcategory: "Ready key helper",
    title: "Turn key into shift",
    description: "One-block shortcut: converts a word key into a shift number.",
    fields: [{ name: "keyText", type: "text", value: "CAT" }]
  },

  // Loops.
  {
    type: "loop_each_char",
    category: "Loops",
    subcategory: "Character loops",
    title: "For each character in message",
    description: "Runs the blocks below once for every character in the message.",
    fields: []
  },
  {
    type: "loop_each_char_end",
    category: "Loops",
    subcategory: "Character loops",
    title: "End character loop",
    description: "Marks where the character loop stops.",
    fields: []
  },
  {
    type: "loop_each_key_char",
    category: "Loops",
    subcategory: "Key loops",
    title: "For each letter in key word",
    description: "Runs the blocks below once for every letter in the stored key word.",
    fields: []
  },
  {
    type: "loop_each_key_char_end",
    category: "Loops",
    subcategory: "Key loops",
    title: "End key loop",
    description: "Marks where the key-word loop stops.",
    fields: []
  },
  {
    type: "loop_each_token",
    category: "Loops",
    subcategory: "Morse loops",
    title: "For each Morse code in list",
    description: "Runs the blocks below once for every Morse code token.",
    fields: []
  },
  {
    type: "loop_each_token_end",
    category: "Loops",
    subcategory: "Morse loops",
    title: "End Morse loop",
    description: "Marks where the Morse token loop stops.",
    fields: []
  },
  {
    type: "loop_repeat_next",
    category: "Loops",
    subcategory: "Repeat helpers",
    title: "Repeat next block",
    description: "Runs only the block under it several times.",
    fields: [{ name: "times", type: "number", value: 2 }]
  },
  {
    type: "loop_repeat_all",
    category: "Loops",
    subcategory: "Repeat helpers",
    title: "Repeat all cipher blocks",
    description: "Repeats the cipher/text blocks after this point.",
    fields: [{ name: "times", type: "number", value: 2 }]
  },

  // Letter math.
  {
    type: "char_get_alphabet_index",
    category: "Letter Math",
    subcategory: "Find positions",
    title: "Find current letter position",
    description: "Finds the current character position in the A-Z alphabet list.",
    fields: []
  },
  {
    type: "char_shift_index_by_number",
    category: "Letter Math",
    subcategory: "Shift calculations",
    title: "New position = position +",
    description: "Adds a typed shift number and wraps around the alphabet using mod 26.",
    fields: [{ name: "amount", type: "number", value: 3 }]
  },
  {
    type: "char_shift_index_by_variable",
    category: "Letter Math",
    subcategory: "Shift calculations",
    title: "New position = position + shift variable",
    description: "Adds the stored shift variable and wraps around using mod 26.",
    fields: []
  },
  {
    type: "char_rotor_shift_index",
    category: "Letter Math",
    subcategory: "Rotor calculations",
    title: "New position = position + rotor + count",
    description: "Uses rotor position plus how many letters have already passed through the machine.",
    fields: []
  },
  {
    type: "char_reflect_index",
    category: "Letter Math",
    subcategory: "Reflect calculations",
    title: "New position = 25 - position",
    description: "Reflects the alphabet position, creating A↔Z, B↔Y, C↔X.",
    fields: []
  },

  // Cipher pieces and builders.
  {
    type: "out_clear",
    category: "Cipher Pieces",
    subcategory: "Output builder",
    title: "Create empty output text",
    description: "Clears the output text before a loop builds a new message.",
    fields: []
  },
  {
    type: "out_append_current",
    category: "Cipher Pieces",
    subcategory: "Output builder",
    title: "Append current character to output",
    description: "Adds the current character to the output text.",
    fields: []
  },
  {
    type: "out_append_alphabet_index_or_original",
    category: "Cipher Pieces",
    subcategory: "Output builder",
    title: "Append alphabet[new position] or original",
    description: "Adds the calculated alphabet letter; if not a letter, keeps the original character.",
    fields: []
  },
  {
    type: "out_append_custom_index_or_original",
    category: "Cipher Pieces",
    subcategory: "Output builder",
    title: "Append scrambledAlphabet[position] or original",
    description: "Adds the matching letter from the scrambled alphabet list.",
    fields: []
  },
  {
    type: "message_from_output",
    category: "Cipher Pieces",
    subcategory: "Output builder",
    title: "Replace message with output text",
    description: "Makes the built output become the current message.",
    fields: []
  },
  {
    type: "plug_swap_current",
    category: "Cipher Pieces",
    subcategory: "Plugboard pieces",
    title: "If current letter is A/B, swap it",
    description: "Swaps two chosen letters in the current character before appending it.",
    fields: [
      { name: "a", type: "text", value: "A" },
      { name: "b", type: "text", value: "Z" }
    ]
  },

  // Encoding pieces.
  {
    type: "morse_lookup_encode_current",
    category: "Encoding",
    subcategory: "Morse encode pieces",
    title: "Look up current character in Morse table",
    description: "Finds the Morse code for the current character.",
    fields: []
  },
  {
    type: "out_append_morse_current_with_space",
    category: "Encoding",
    subcategory: "Morse encode pieces",
    title: "Append Morse code to output",
    description: "Adds the current Morse code to the output text with spacing.",
    fields: []
  },
  {
    type: "morse_lookup_decode_current",
    category: "Encoding",
    subcategory: "Morse decode pieces",
    title: "Look up current Morse code as letter",
    description: "Finds the letter that matches the current Morse code token.",
    fields: []
  },
  {
    type: "out_append_decoded_current",
    category: "Encoding",
    subcategory: "Morse decode pieces",
    title: "Append decoded letter to output",
    description: "Adds the decoded Morse letter to the output text.",
    fields: []
  },

  // Complete blocks kept for comparison and scaffolding.
  {
    type: "crypto_caesar",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Caesar shift by",
    description: "Shortcut block: moves each letter forward/backward in the alphabet.",
    fields: [{ name: "shift", type: "number", value: 3 }]
  },
  {
    type: "crypto_shift_variable",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Shift using variable",
    description: "Shortcut block: uses the stored shift variable.",
    fields: []
  },
  {
    type: "crypto_rotor",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Rotor shift from position",
    description: "Shortcut block: each next letter shifts more, like a rotating wheel.",
    fields: [{ name: "position", type: "number", value: 1 }]
  },
  {
    type: "crypto_reflector",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Reflector A↔Z",
    description: "Shortcut block: turns A into Z, B into Y, C into X, and so on.",
    fields: []
  },
  {
    type: "crypto_plugboard",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Plugboard swap",
    description: "Shortcut block: swaps two letters throughout the message.",
    fields: [
      { name: "a", type: "text", value: "A" },
      { name: "b", type: "text", value: "Z" }
    ]
  },
  {
    type: "crypto_substitution",
    category: "Ready-Made",
    subcategory: "Complete cipher blocks",
    title: "Substitute with custom alphabet",
    description: "Shortcut block: replaces letters using the scrambled alphabet list.",
    fields: []
  },
  {
    type: "crypto_reverse",
    category: "Ready-Made",
    subcategory: "Complete message blocks",
    title: "Reverse message",
    description: "Shortcut block: flips the whole message around.",
    fields: []
  },
  {
    type: "crypto_swap_pairs",
    category: "Ready-Made",
    subcategory: "Complete message blocks",
    title: "Swap letter pairs",
    description: "Shortcut block: changes AB CD EF into BA DC FE.",
    fields: []
  },
  {
    type: "crypto_morse_encode",
    category: "Ready-Made",
    subcategory: "Complete encoding blocks",
    title: "Encode to Morse code",
    description: "Shortcut block: encoding example, not true encryption.",
    fields: []
  },
  {
    type: "crypto_morse_decode",
    category: "Ready-Made",
    subcategory: "Complete encoding blocks",
    title: "Decode Morse code",
    description: "Shortcut block: turns dots and dashes back into letters.",
    fields: []
  },

  // Logic and output.
  {
    type: "logic_password",
    category: "Logic",
    subcategory: "Cyber checks",
    title: "Check password strength",
    description: "Scores the current message like a password.",
    fields: []
  },
  {
    type: "logic_contains",
    category: "Logic",
    subcategory: "Text checks",
    title: "If message contains",
    description: "Adds a note to the log if the text is found.",
    fields: [{ name: "needle", type: "text", value: "SECRET" }]
  },
  {
    type: "output_show",
    category: "Output",
    subcategory: "Show results",
    title: "Show current message",
    description: "Prints the current secret message into the run log.",
    fields: []
  },
  {
    type: "output_note",
    category: "Output",
    subcategory: "Show results",
    title: "Add note",
    description: "Writes a student explanation in the log.",
    fields: [{ name: "note", type: "text", value: "My encryption machine is finished!" }]
  }
];

const encryptionBlockTypes = new Set([
  "text_uppercase",
  "text_remove_spaces",
  "text_add_prefix",
  "out_clear",
  "out_append_current",
  "out_append_alphabet_index_or_original",
  "out_append_custom_index_or_original",
  "message_from_output",
  "plug_swap_current",
  "morse_lookup_encode_current",
  "out_append_morse_current_with_space",
  "morse_lookup_decode_current",
  "out_append_decoded_current",
  "char_get_alphabet_index",
  "char_shift_index_by_number",
  "char_shift_index_by_variable",
  "char_rotor_shift_index",
  "char_reflect_index",
  "crypto_caesar",
  "crypto_shift_variable",
  "crypto_rotor",
  "crypto_reflector",
  "crypto_plugboard",
  "crypto_substitution",
  "crypto_reverse",
  "crypto_swap_pairs",
  "crypto_morse_encode",
  "crypto_morse_decode"
]);

const categories = ["Events", "Text", "Lists", "Variables", "Loops", "Letter Math", "Cipher Pieces", "Encoding", "Ready-Made", "Logic", "Output"];
let activeCategory = "Events";
let draggedElement = null;
let draggedFromPalette = false;

const workspace = document.getElementById("workspace");
const palette = document.getElementById("blockPalette");
const tabs = document.getElementById("categoryTabs");
const toolbox = document.querySelector(".toolbox");
const trashBin = document.getElementById("trashBin");
const blockTemplate = document.getElementById("blockTemplate");
const runLog = document.getElementById("runLog");
const liveMessage = document.getElementById("liveMessage");
const pseudoCode = document.getElementById("pseudoCode");
const importFileInput = document.getElementById("importFileInput");
const skipLogBtn = document.getElementById("skipLogBtn");
const appMessageModal = document.getElementById("appMessageModal");
const appMessageTitle = document.getElementById("appMessageTitle");
const appMessageBody = document.getElementById("appMessageBody");
const appMessageClose = document.getElementById("appMessageClose");
const appMessageOk = document.getElementById("appMessageOk");
const fieldModal = document.getElementById("fieldModal");
const fieldModalTitle = document.getElementById("fieldModalTitle");
const fieldModalHelp = document.getElementById("fieldModalHelp");
const fieldModalLabel = document.getElementById("fieldModalLabel");
const fieldModalControlWrap = document.getElementById("fieldModalControlWrap");
const fieldModalPreview = document.getElementById("fieldModalPreview");
const fieldModalSave = document.getElementById("fieldModalSave");
const fieldModalCancel = document.getElementById("fieldModalCancel");
const fieldModalClose = document.getElementById("fieldModalClose");
let activeFieldEditor = null;
let logTypingToken = 0;
let latestLogItems = [];

function findDefinition(type) {
  return blockDefinitions.find((block) => block.type === type);
}

function init() {
  renderTabs();
  renderPalette();
  bindWorkspaceEvents();
  bindTrashEvents();
  bindButtons();
  bindFieldModalEvents();
  bindAppMessageEvents();
  updateWorkspaceState();
  updatePseudoCode();
}

function getCategoryShortLabel(category) {
  const shortLabels = {
    "Events": "E",
    "Text": "T",
    "Lists": "L",
    "Variables": "V",
    "Loops": "LP",
    "Letter Math": "LM",
    "Cipher Pieces": "CP",
    "Encoding": "EN",
    "Ready-Made": "RM",
    "Logic": "LG",
    "Output": "O"
  };
  return shortLabels[category] || category.slice(0, 2).toUpperCase();
}

function getCategoryFullLabel(category) {
  const fullLabels = {
    "Events": "Event",
    "Text": "Text",
    "Lists": "List",
    "Variables": "Variable",
    "Loops": "Loop",
    "Letter Math": "Letter Math",
    "Cipher Pieces": "Cipher Pieces",
    "Encoding": "Encoding",
    "Ready-Made": "Ready-Made",
    "Logic": "Logic",
    "Output": "Output"
  };
  return fullLabels[category] || category;
}

function renderTabs() {
  tabs.innerHTML = "";
  categories.forEach((category) => {
    const isActive = category === activeCategory;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-tab category-${category.replace(/\s+/g, "-")}`;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-label", category);
    button.setAttribute("aria-pressed", String(isActive));

    const label = document.createElement("span");
    label.className = "tab-label";
    label.textContent = isActive ? getCategoryFullLabel(category) : getCategoryShortLabel(category);
    button.appendChild(label);

    button.addEventListener("click", () => {
      activeCategory = category;
      renderTabs();
      renderPalette();
    });
    tabs.appendChild(button);
  });
}

function renderPalette() {
  palette.innerHTML = "";
  const definitions = blockDefinitions.filter((block) => block.category === activeCategory);
  const groups = new Map();
  definitions.forEach((definition) => {
    const groupName = definition.subcategory || "Blocks";
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(definition);
  });

  groups.forEach((items, groupName) => {
    const heading = document.createElement("div");
    heading.className = "palette-subheading";
    heading.textContent = groupName;
    palette.appendChild(heading);

    items.forEach((definition) => {
      const element = document.createElement("div");
      element.className = `palette-block category-${definition.category.replace(/\s+/g, "-")}`;
      element.draggable = true;
      element.tabIndex = 0;
      element.dataset.type = definition.type;
      element.setAttribute("aria-label", `${definition.title}. ${definition.description}`);
      element.innerHTML = `<div class="palette-title">${escapeHtml(definition.title)}</div><p class="palette-description" role="tooltip">${escapeHtml(definition.description)}</p>`;
      element.addEventListener("dragstart", (event) => {
        draggedElement = element;
        draggedFromPalette = true;
        event.dataTransfer.setData("text/plain", definition.type);
        element.classList.add("dragging");
      });
      element.addEventListener("dragend", () => {
        draggedElement = null;
        draggedFromPalette = false;
        element.classList.remove("dragging");
      });
      element.addEventListener("click", () => {
        addBlockToWorkspace(definition.type);
      });
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          addBlockToWorkspace(definition.type);
        }
      });
      palette.appendChild(element);
    });
  });
}

function addBlockToWorkspace(type, values = {}) {
  const newBlock = createProgramBlock(type, values);
  if (!newBlock) return;
  workspace.appendChild(newBlock);
  updateWorkspaceState();
  updatePseudoCode();
  newBlock.classList.add("added-pop");
  window.setTimeout(() => newBlock.classList.remove("added-pop"), 320);
  newBlock.scrollIntoView({ behavior: "smooth", block: "nearest" });
  const editable = newBlock.querySelector(".field-input-button, select, input:not([type='hidden']), button:not(.delete-block)");
  if (editable) editable.focus({ preventScroll: true });
}

function createProgramBlock(type, values = {}) {
  const definition = findDefinition(type);
  if (!definition) return null;

  const node = blockTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.type = definition.type;
  node.classList.add(`category-${definition.category.replace(/\s+/g, "-")}`);
  node.setAttribute("aria-label", `${definition.title}. ${definition.description}`);
  node.querySelector(".block-title").textContent = definition.title;
  const descriptionElement = node.querySelector(".block-description");
  descriptionElement.textContent = definition.description;
  descriptionElement.setAttribute("role", "tooltip");

  const fieldsContainer = node.querySelector(".block-fields");
  definition.fields.forEach((field) => {
    const fieldElement = createFieldElement(field, values[field.name] ?? field.value);
    fieldsContainer.appendChild(fieldElement);
  });

  node.querySelector(".delete-block").addEventListener("click", () => {
    node.remove();
    updateWorkspaceState();
    updatePseudoCode();
  });

  node.addEventListener("dragstart", (event) => {
    draggedElement = node;
    draggedFromPalette = false;
    node.classList.add("dragging");
    showTrashBin(true);
    event.dataTransfer.setData("text/plain", type);
  });

  node.addEventListener("dragend", () => {
    draggedElement = null;
    draggedFromPalette = false;
    node.classList.remove("dragging");
    setTrashReady(false);
    showTrashBin(false);
  });

  node.addEventListener("input", updatePseudoCode);
  node.addEventListener("change", updatePseudoCode);

  return node;
}

function createFieldElement(field, value) {
  const wrapper = document.createElement("span");
  wrapper.className = "field-editor";
  wrapper.dataset.fieldName = field.name;

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.dataset.field = field.name;
  hiddenInput.dataset.fieldType = field.type;
  hiddenInput.dataset.fieldLabel = fieldLabelText(field.name);
  hiddenInput.value = value;
  if (field.type === "select") hiddenInput.dataset.options = JSON.stringify(field.options || []);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "field-input-button";
  button.textContent = "Input";
  button.setAttribute("aria-label", `Input ${fieldLabelText(field.name)}`);

  const display = document.createElement("span");
  display.className = "field-value-display";
  display.setAttribute("aria-live", "polite");
  updateFieldDisplay(display, hiddenInput.value, field);

  button.addEventListener("click", () => openFieldModal(hiddenInput, field, display));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFieldModal(hiddenInput, field, display);
    }
  });

  wrapper.append(button, display, hiddenInput);
  return wrapper;
}

function bindFieldAutoSize(input) {
  resizeFieldToContent(input);
  input.addEventListener("input", () => resizeFieldToContent(input));
}

function resizeFieldToContent(input) {
  const value = String(input.value || input.placeholder || "");
  const isNumber = input.type === "number";
  const fieldName = input.dataset.field || "";
  const minimum = isNumber ? 5 : fieldName === "customAlphabet" ? 28 : fieldName === "message" ? 16 : 4;
  const maximum = fieldName === "message" ? 46 : fieldName === "customAlphabet" ? 34 : 32;
  const width = Math.max(minimum, Math.min(maximum, value.length + 1));
  input.style.width = `${width}ch`;
}


function fieldLabelText(name) {
  return String(name || "value")
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function displayFieldValue(value) {
  const text = String(value ?? "");
  if (!text) return "(empty)";
  return text.length > 34 ? `${text.slice(0, 34)}...` : text;
}

function updateFieldDisplay(display, value, field = {}) {
  if (!display) return;
  display.textContent = displayFieldValue(value);
  display.title = String(value ?? "");
  display.dataset.empty = String(value ?? "") ? "false" : "true";
  if (field.type === "number") display.dataset.kind = "number";
}

function openFieldModal(hiddenInput, field, display) {
  if (!fieldModal || !hiddenInput) return;
  activeFieldEditor = { hiddenInput, field, display };

  const label = fieldLabelText(field.name);
  fieldModalTitle.textContent = `Input: ${label}`;
  fieldModalLabel.textContent = label;
  fieldModalHelp.textContent = getFieldHelpText(field);
  fieldModalPreview.textContent = displayFieldValue(hiddenInput.value);
  fieldModalControlWrap.innerHTML = "";

  let control;
  if (field.type === "select") {
    control = document.createElement("select");
    const options = field.options || [];
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      if (String(option) === String(hiddenInput.value)) optionElement.selected = true;
      control.appendChild(optionElement);
    });
  } else if (["message", "note", "customAlphabet"].includes(field.name)) {
    control = document.createElement("textarea");
    control.rows = field.name === "customAlphabet" ? 2 : 4;
    control.spellcheck = false;
  } else {
    control = document.createElement("input");
    control.type = field.type === "number" ? "number" : "text";
    if (field.type === "number") control.step = "1";
    control.spellcheck = false;
  }

  control.id = "fieldModalControl";
  control.className = "field-modal-control";
  control.value = hiddenInput.value;
  control.addEventListener("input", () => {
    fieldModalPreview.textContent = displayFieldValue(control.value);
  });
  control.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && control.tagName !== "TEXTAREA") {
      event.preventDefault();
      saveFieldModalValue();
    }
  });
  fieldModalControlWrap.appendChild(control);

  fieldModal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => fieldModal.classList.add("field-modal-open"));
  control.focus({ preventScroll: true });
  if (control.select) control.select();
}

function getFieldHelpText(field) {
  const name = field.name;
  if (name === "message") return "Type the plain text message that enters the secret machine.";
  if (name === "customAlphabet") return "Enter a 26-letter scrambled alphabet. Duplicate letters will be cleaned when the block runs.";
  if (name === "keyword" || name === "keyText") return "Type a secret word. The machine can use it to build a key or shift number.";
  if (name === "varValue") return "Type the value to store inside this variable.";
  if (name === "amount" || name === "shift" || name === "position") return "Type a number. Positive moves forward; negative moves backward.";
  if (name === "a" || name === "b") return "Type one letter for the swap pair.";
  if (name === "note") return "Write a short explanation that will appear in the Run Log.";
  if (field.type === "select") return "Choose which storage box or option this block should use.";
  return "Type the value, then click Update Block.";
}

function saveFieldModalValue() {
  if (!activeFieldEditor) return;
  const control = document.getElementById("fieldModalControl");
  if (!control) return;
  const { hiddenInput, field, display } = activeFieldEditor;
  hiddenInput.value = control.value;
  updateFieldDisplay(display, hiddenInput.value, field);
  hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
  updatePseudoCode();
  closeFieldModal();
}

function closeFieldModal() {
  if (!fieldModal) return;
  fieldModal.classList.remove("field-modal-open");
  document.body.classList.remove("modal-open");
  const focusTarget = activeFieldEditor?.hiddenInput?.closest(".field-editor")?.querySelector(".field-input-button");
  window.setTimeout(() => {
    fieldModal.hidden = true;
    fieldModalControlWrap.innerHTML = "";
    activeFieldEditor = null;
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }, 160);
}


function showAppMessage(title, lines = []) {
  if (!appMessageModal) {
    console.log(title, lines.join("\n"));
    return;
  }

  appMessageTitle.textContent = title;
  appMessageBody.innerHTML = "";
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    appMessageBody.appendChild(p);
  });

  appMessageModal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => appMessageModal.classList.add("app-message-open"));
  appMessageOk?.focus({ preventScroll: true });
}

function closeAppMessage() {
  if (!appMessageModal) return;
  appMessageModal.classList.remove("app-message-open");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    appMessageModal.hidden = true;
    appMessageBody.innerHTML = "";
  }, 160);
}

function bindAppMessageEvents() {
  if (!appMessageModal) return;
  appMessageOk?.addEventListener("click", closeAppMessage);
  appMessageClose?.addEventListener("click", closeAppMessage);
  appMessageModal.querySelectorAll("[data-close-message]").forEach((element) => {
    element.addEventListener("click", closeAppMessage);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !appMessageModal.hidden) closeAppMessage();
  });
}

function bindFieldModalEvents() {
  if (!fieldModal) return;
  fieldModalSave?.addEventListener("click", saveFieldModalValue);
  fieldModalCancel?.addEventListener("click", closeFieldModal);
  fieldModalClose?.addEventListener("click", closeFieldModal);
  fieldModal.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeFieldModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !fieldModal.hidden) closeFieldModal();
  });
}

function bindWorkspaceEvents() {
  workspace.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(workspace, event.clientY);
    const dragging = document.querySelector(".program-block.dragging");

    if (dragging && !draggedFromPalette) {
      if (afterElement == null) {
        workspace.appendChild(dragging);
      } else {
        workspace.insertBefore(dragging, afterElement);
      }
    }
  });

  workspace.addEventListener("drop", (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    if (!type) return;

    if (draggedFromPalette) {
      const newBlock = createProgramBlock(type);
      if (!newBlock) return;
      const afterElement = getDragAfterElement(workspace, event.clientY);
      if (afterElement == null) {
        workspace.appendChild(newBlock);
      } else {
        workspace.insertBefore(newBlock, afterElement);
      }
      newBlock.classList.add("added-pop");
      window.setTimeout(() => newBlock.classList.remove("added-pop"), 320);
    }

    updateWorkspaceState();
    updatePseudoCode();
  });
}

function bindTrashEvents() {
  if (!toolbox || !trashBin) return;

  toolbox.addEventListener("dragover", (event) => {
    if (!draggedElement || draggedFromPalette) return;
    event.preventDefault();
    showTrashBin(true);
    setTrashReady(true);
  });

  toolbox.addEventListener("dragleave", (event) => {
    if (!toolbox.contains(event.relatedTarget)) setTrashReady(false);
  });

  toolbox.addEventListener("drop", (event) => {
    if (!draggedElement || draggedFromPalette) return;
    event.preventDefault();
    draggedElement.remove();
    draggedElement = null;
    draggedFromPalette = false;
    setTrashReady(false);
    showTrashBin(false);
    updateWorkspaceState();
    updatePseudoCode();
  });
}

function showTrashBin(show) {
  if (!trashBin) return;
  trashBin.hidden = !show;
}

function setTrashReady(ready) {
  if (!trashBin) return;
  trashBin.classList.toggle("trash-ready", ready);
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".program-block:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function bindButtons() {
  document.getElementById("runBtn").addEventListener("click", runProgram);
  document.getElementById("clearBtn").addEventListener("click", () => {
    workspace.querySelectorAll(".program-block").forEach((block) => block.remove());
    updateWorkspaceState();
    updatePseudoCode();
    clearOutput();
  });
  document.getElementById("saveBtn").addEventListener("click", saveProgram);
  document.getElementById("loadBtn").addEventListener("click", loadProgram);
  document.getElementById("exportBtn")?.addEventListener("click", exportProgram);
  document.getElementById("importBtn")?.addEventListener("click", () => importFileInput?.click());
  importFileInput?.addEventListener("change", importProgramFromFile);
  skipLogBtn?.addEventListener("click", finishTypingLog);
  document.getElementById("sampleCaesarBtn").addEventListener("click", loadCaesarSample);
  document.getElementById("sampleEnigmaBtn").addEventListener("click", loadMiniEnigmaSample);
  document.querySelectorAll("[data-load-sample]").forEach((button) => {
    button.addEventListener("click", () => loadLearningSample(button.dataset.loadSample));
  });
  const collapseHelpButton = document.getElementById("collapseHelp");
  const helpPanel = document.getElementById("helpPanel");
  collapseHelpButton?.addEventListener("click", () => {
    if (helpPanel) helpPanel.hidden = !helpPanel.hidden;
  });
}

function updateWorkspaceState() {
  const hasBlocks = workspace.querySelectorAll(".program-block").length > 0;
  workspace.classList.toggle("empty", !hasBlocks);
}

function clearOutput() {
  logTypingToken += 1;
  latestLogItems = [];
  runLog.innerHTML = "";
  liveMessage.value = "";
  if (skipLogBtn) skipLogBtn.hidden = true;
}

function getProgramBlocks() {
  return [...workspace.querySelectorAll(".program-block")].map((node) => {
    const values = {};
    node.querySelectorAll("[data-field]").forEach((field) => {
      values[field.dataset.field] = field.value;
    });
    return {
      type: node.dataset.type,
      values,
      definition: findDefinition(node.dataset.type)
    };
  });
}

function createContext() {
  return {
    message: "",
    output: "",
    currentChar: "",
    currentToken: "",
    currentCode: "",
    currentIndex: -1,
    calcIndex: -1,
    currentCharNumber: 0,
    keyLetterValue: 0,
    vars: { shift: 0, rotor: 0, key: "", rounds: 1, total: 0 },
    arrays: { alphabet, customAlphabet: "QWERTYUIOPASDFGHJKLZXCVBNM", chars: [], tokens: [], morse: morseMap, reverseMorse: reverseMorseMap },
    logs: [],
    step: 0
  };
}

function runProgram() {
  document.body.classList.remove("run-flash");
  void document.body.offsetWidth;
  document.body.classList.add("run-flash");
  window.setTimeout(() => document.body.classList.remove("run-flash"), 520);
  const blocks = getProgramBlocks();
  const ctx = createContext();

  if (blocks.length === 0) {
    ctx.logs.push("Add some blocks first. Try loading a sample project.");
    renderOutput(ctx);
    return;
  }

  executeBlocks(blocks, ctx, 0, blocks.length);
  renderOutput(ctx);
}

function executeBlocks(blocks, ctx, start, end) {
  for (let index = start; index < end; index++) {
    const block = blocks[index];

    if (block.type === "loop_each_char") {
      const closeIndex = findMatchingLoopEnd(blocks, index, "loop_each_char", "loop_each_char_end", end);
      if (closeIndex === -1) {
        addInfoLog(ctx, "Character loop skipped", ["Missing End character loop block."]);
        continue;
      }
      const chars = [...ctx.message];
      addInfoLog(ctx, "For each character in message", [
        `Characters to process: ${chars.length}.`,
        "The blocks inside the loop run once for each character."
      ]);
      chars.forEach((char, charIndex) => {
        ctx.currentChar = char;
        ctx.currentToken = "";
        ctx.currentCode = "";
        ctx.currentIndex = -1;
        ctx.calcIndex = -1;
        ctx.currentCharNumber = charIndex;
        executeBlocks(blocks, ctx, index + 1, closeIndex);
      });
      index = closeIndex;
      continue;
    }

    if (block.type === "loop_each_key_char") {
      const closeIndex = findMatchingLoopEnd(blocks, index, "loop_each_key_char", "loop_each_key_char_end", end);
      if (closeIndex === -1) {
        addInfoLog(ctx, "Key loop skipped", ["Missing End key loop block."]);
        continue;
      }
      const keyChars = [...String(ctx.vars.key || "").toUpperCase()].filter((char) => /[A-Z]/.test(char));
      addInfoLog(ctx, "For each letter in key word", [
        `Key word: ${formatValueForLog(ctx.vars.key)}.`,
        `Letters to process: ${keyChars.length}.`
      ]);
      keyChars.forEach((char, charIndex) => {
        ctx.currentChar = char;
        ctx.currentToken = "";
        ctx.currentCode = "";
        ctx.currentIndex = -1;
        ctx.calcIndex = -1;
        ctx.currentCharNumber = charIndex;
        executeBlocks(blocks, ctx, index + 1, closeIndex);
      });
      index = closeIndex;
      continue;
    }

    if (block.type === "loop_each_token") {
      const closeIndex = findMatchingLoopEnd(blocks, index, "loop_each_token", "loop_each_token_end", end);
      if (closeIndex === -1) {
        addInfoLog(ctx, "Morse loop skipped", ["Missing End Morse loop block."]);
        continue;
      }
      const tokens = ctx.arrays.tokens.length ? ctx.arrays.tokens : String(ctx.message || "").trim().split(/\s+/).filter(Boolean);
      addInfoLog(ctx, "For each Morse code in list", [
        `Codes to process: ${tokens.length}.`,
        "Each token is looked up in the reverse Morse table."
      ]);
      tokens.forEach((token, tokenIndex) => {
        ctx.currentToken = token;
        ctx.currentChar = "";
        ctx.currentCode = "";
        ctx.currentIndex = -1;
        ctx.calcIndex = -1;
        ctx.currentCharNumber = tokenIndex;
        executeBlocks(blocks, ctx, index + 1, closeIndex);
      });
      index = closeIndex;
      continue;
    }

    if (["loop_each_char_end", "loop_each_key_char_end", "loop_each_token_end"].includes(block.type)) {
      continue;
    }

    if (block.type === "loop_repeat_next") {
      const times = clampNumber(parseInt(block.values.times, 10), 1, 20);
      const nextBlock = blocks[index + 1];
      if (!nextBlock) {
        addInfoLog(ctx, "Repeat next block skipped", [
          "There is no block directly under the repeat block.",
          "Place one text/cipher block under it to repeat that action."
        ]);
        continue;
      }
      addInfoLog(ctx, "Loop: repeat next block", [
        `Target block: ${blockTitle(nextBlock)}`,
        `Repeats: ${times} time(s).`
      ]);
      for (let count = 0; count < times; count++) {
        executeSingleBlock(nextBlock, ctx);
      }
      index += 1;
      continue;
    }

    if (block.type === "loop_repeat_all") {
      const times = clampNumber(parseInt(block.values.times, 10), 1, 10);
      let targetEnd = blocks.findIndex((item, itemIndex) => itemIndex > index && !encryptionBlockTypes.has(item.type));
      if (targetEnd === -1) targetEnd = end;
      const repeatedBlocks = blocks.slice(index + 1, targetEnd).filter((item) => encryptionBlockTypes.has(item.type));
      addInfoLog(ctx, "Loop: repeat all cipher/text blocks", [
        `Blocks repeated: ${repeatedBlocks.length}.`,
        `Repeats: ${times} time(s).`,
        repeatedBlocks.length ? `Block list: ${repeatedBlocks.map(blockTitle).join(" → ")}` : "No cipher/text blocks were found under this loop."
      ]);
      for (let count = 0; count < times; count++) {
        repeatedBlocks.forEach((item) => executeSingleBlock(item, ctx));
      }
      index = targetEnd - 1;
      continue;
    }

    executeSingleBlock(block, ctx);
  }
}

function findMatchingLoopEnd(blocks, startIndex, startType, endType, hardEnd) {
  let depth = 0;
  for (let i = startIndex; i < hardEnd; i++) {
    if (blocks[i].type === startType) depth += 1;
    if (blocks[i].type === endType) depth -= 1;
    if (depth === 0) return i;
  }
  return -1;
}

function executeSingleBlock(block, ctx) {
  const v = block.values;
  let before;

  switch (block.type) {
    case "event_start":
      addInfoLog(ctx, "When Run clicked", [
        "Legacy start flag kept for old saved projects.",
        "New projects can start with one of the two Event input blocks."
      ]);
      break;
    case "event_input":
      before = ctx.message;
      ctx.message = v.message || "";
      addChangeLog(ctx, "When Run clicked, set starting message", before, ctx.message, [
        "This is the plain text that enters the machine.",
        "Plain text means the readable original message."
      ]);
      break;
    case "event_prompt": {
      before = ctx.message;
      const answer = window.prompt("Enter a message for the secret machine:", ctx.message || "HELLO");
      ctx.message = answer ?? ctx.message;
      addChangeLog(ctx, "When Run clicked, ask student for message", before, ctx.message, [
        "The typed answer becomes the new plain text input."
      ]);
      break;
    }
    case "text_uppercase":
      before = ctx.message;
      ctx.message = ctx.message.toUpperCase();
      addChangeLog(ctx, "Make message UPPERCASE", before, ctx.message, [
        "All lowercase letters become uppercase so A-Z encryption blocks can read them clearly."
      ]);
      break;
    case "text_remove_spaces":
      before = ctx.message;
      ctx.message = ctx.message.replace(/\s+/g, "");
      addChangeLog(ctx, "Remove spaces", before, ctx.message, [
        "Spaces are deleted to make the cipher text harder to read."
      ]);
      break;
    case "text_add_prefix":
      before = ctx.message;
      ctx.message = `${v.prefix || ""}${ctx.message}`;
      addChangeLog(ctx, "Add secret prefix", before, ctx.message, [
        `Prefix added to the front: ${formatValueForLog(v.prefix || "")}.`
      ]);
      break;
    case "array_alphabet":
      ctx.arrays.alphabet = alphabet;
      addInfoLog(ctx, "Use alphabet list A-Z", [
        `Alphabet used for letter positions: ${alphabet}.`,
        "Position examples: A=0, B=1, C=2, ..., Z=25."
      ]);
      break;
    case "array_custom":
      ctx.arrays.customAlphabet = cleanAlphabet(v.customAlphabet);
      addInfoLog(ctx, "Set scrambled alphabet list", [
        `Cleaned scrambled alphabet: ${ctx.arrays.customAlphabet}.`,
        `Length: ${ctx.arrays.customAlphabet.length}/26.`,
        "The substitution blocks read this list like an array."
      ]);
      break;
    case "array_keyword":
      ctx.arrays.customAlphabet = keywordAlphabet(v.keyword);
      addInfoLog(ctx, "Build alphabet list from keyword", [
        `Keyword: ${formatValueForLog(v.keyword || "")}.`,
        `New scrambled alphabet: ${ctx.arrays.customAlphabet}.`,
        `Mapping preview: ${previewSubstitutionMap(ctx.arrays.alphabet, ctx.arrays.customAlphabet, 10)}.`
      ]);
      break;
    case "list_message_chars":
      ctx.arrays.chars = [...ctx.message];
      addInfoLog(ctx, "Turn message into character list", [
        `List length: ${ctx.arrays.chars.length}.`,
        `Preview: ${previewList(ctx.arrays.chars)}.`
      ]);
      break;
    case "list_reverse_chars":
      ctx.arrays.chars.reverse();
      addInfoLog(ctx, "Reverse character list", [
        "The last character moves to the front.",
        `Preview: ${previewList(ctx.arrays.chars)}.`
      ]);
      break;
    case "list_swap_pairs":
      ctx.arrays.chars = swapPairsArray(ctx.arrays.chars);
      addInfoLog(ctx, "Swap neighbours in character list", [
        "Pairs are swapped: AB becomes BA, CD becomes DC.",
        `Preview: ${previewList(ctx.arrays.chars)}.`
      ]);
      break;
    case "list_join_chars_to_message":
      before = ctx.message;
      ctx.message = ctx.arrays.chars.join("");
      addChangeLog(ctx, "Join character list into message", before, ctx.message, [
        "The character array becomes the current message again."
      ]);
      break;
    case "morse_table":
      ctx.arrays.morse = morseMap;
      addInfoLog(ctx, "Use Morse code table", [
        "Loaded A-Z and 0-9 Morse mappings.",
        "Example: S→..., O→---."
      ]);
      break;
    case "morse_reverse_table":
      ctx.arrays.reverseMorse = reverseMorseMap;
      addInfoLog(ctx, "Use reverse Morse table", [
        "Loaded dots-and-dashes back to letters.",
        "Example: ...→S, ---→O."
      ]);
      break;
    case "token_split_morse":
      ctx.arrays.tokens = String(ctx.message || "").trim().split(/\s+/).filter(Boolean);
      addInfoLog(ctx, "Split Morse message into code list", [
        `Tokens: ${ctx.arrays.tokens.length}.`,
        `Preview: ${previewList(ctx.arrays.tokens)}.`
      ]);
      break;
    case "var_set": {
      const name = v.varName;
      const raw = v.varValue;
      const oldValue = ctx.vars[name];
      ctx.vars[name] = ["shift", "rotor", "rounds", "total"].includes(name) ? Number(raw) || 0 : raw;
      addInfoLog(ctx, `Set variable ${name}`, [
        `Old ${name}: ${formatValueForLog(oldValue)}.`,
        `New ${name}: ${formatValueForLog(ctx.vars[name])}.`,
        "Variables are storage boxes. This block stores a value but does not encrypt the message by itself."
      ]);
      break;
    }
    case "var_change": {
      const name = v.varName;
      const amount = Number(v.amount) || 0;
      const oldValue = Number(ctx.vars[name] || 0);
      ctx.vars[name] = oldValue + amount;
      addInfoLog(ctx, `Change variable ${name}`, [
        `Old ${name}: ${oldValue}.`,
        `Change amount: ${amount}.`,
        `New ${name}: ${ctx.vars[name]}.`
      ]);
      break;
    }
    case "key_set_word": {
      const key = cleanAlphabet(v.keyText || "");
      ctx.vars.key = key;
      addInfoLog(ctx, "Set secret key word", [
        `Key stored: ${formatValueForLog(key)}.`,
        "Now use the key loop blocks to calculate a shift number from each letter."
      ]);
      break;
    }
    case "key_clear_total":
      ctx.vars.total = 0;
      addInfoLog(ctx, "Set key total to 0", ["The running total is ready for the key letters."]);
      break;
    case "key_letter_value": {
      const upper = String(ctx.currentChar || "").toUpperCase();
      const index = alphabet.indexOf(upper);
      ctx.keyLetterValue = index >= 0 ? index + 1 : 0;
      addInfoLog(ctx, "Find key letter value A=1", [
        `Current key letter: ${formatValueForLog(upper)}.`,
        `Value: ${ctx.keyLetterValue}.`
      ]);
      break;
    }
    case "key_add_letter_value_to_total": {
      const oldTotal = Number(ctx.vars.total || 0);
      ctx.vars.total = oldTotal + Number(ctx.keyLetterValue || 0);
      addInfoLog(ctx, "Add key letter value to total", [
        `${oldTotal} + ${ctx.keyLetterValue} = ${ctx.vars.total}.`
      ]);
      break;
    }
    case "key_total_to_shift": {
      const total = Number(ctx.vars.total || 0);
      ctx.vars.shift = mod(total, 26);
      addInfoLog(ctx, "Set shift = key total mod 26", [
        `Key total: ${total}.`,
        `Shift: ${total} mod 26 = ${ctx.vars.shift}.`
      ]);
      break;
    }
    case "var_key_to_shift": {
      const key = cleanAlphabet(v.keyText || "");
      const pieces = [...key].map((char) => `${char}(${alphabet.indexOf(char) + 1})`);
      const total = [...key].reduce((sum, char) => sum + alphabet.indexOf(char) + 1, 0);
      ctx.vars.key = key;
      ctx.vars.total = total;
      ctx.vars.shift = mod(total, 26);
      addInfoLog(ctx, "Turn key into shift", [
        `Key text: ${formatValueForLog(key)}.`,
        pieces.length ? `Letter values: ${pieces.join(" + ")}.` : "No key letters were entered.",
        `Total: ${total}.`,
        `Shift value: ${total} mod 26 = ${ctx.vars.shift}.`,
        "This is the shortcut version. Students can build the same process using the key-loop blocks."
      ]);
      break;
    }
    case "char_get_alphabet_index": {
      const upper = String(ctx.currentChar || "").toUpperCase();
      ctx.currentIndex = ctx.arrays.alphabet.indexOf(upper);
      ctx.calcIndex = ctx.currentIndex;
      addInfoLog(ctx, "Find current letter position", [
        `Current character: ${showCharChange(ctx.currentChar)}.`,
        ctx.currentIndex >= 0 ? `Position in alphabet: ${ctx.currentIndex}.` : "Not an A-Z letter, so it can be kept unchanged."
      ]);
      break;
    }
    case "char_shift_index_by_number": {
      const amount = Number(v.amount) || 0;
      ctx.calcIndex = ctx.currentIndex >= 0 ? mod(ctx.currentIndex + amount, ctx.arrays.alphabet.length) : -1;
      addInfoLog(ctx, "New position = position + number", [
        `Shift amount: ${amount}.`,
        ctx.currentIndex >= 0 ? `(${ctx.currentIndex} + ${amount}) mod 26 = ${ctx.calcIndex}.` : "Skipped because current character is not a letter."
      ]);
      break;
    }
    case "char_shift_index_by_variable": {
      const shift = Number(ctx.vars.shift) || 0;
      ctx.calcIndex = ctx.currentIndex >= 0 ? mod(ctx.currentIndex + shift, ctx.arrays.alphabet.length) : -1;
      addInfoLog(ctx, "New position = position + shift variable", [
        `Read shift variable: ${shift}.`,
        ctx.currentIndex >= 0 ? `(${ctx.currentIndex} + ${shift}) mod 26 = ${ctx.calcIndex}.` : "Skipped because current character is not a letter."
      ]);
      break;
    }
    case "char_rotor_shift_index": {
      const rotor = Number(ctx.vars.rotor) || 0;
      const amount = rotor + Number(ctx.currentCharNumber || 0);
      ctx.calcIndex = ctx.currentIndex >= 0 ? mod(ctx.currentIndex + amount, ctx.arrays.alphabet.length) : -1;
      addInfoLog(ctx, "New position = position + rotor + count", [
        `Rotor: ${rotor}. Letter count: ${ctx.currentCharNumber}. Shift amount: ${amount}.`,
        ctx.currentIndex >= 0 ? `(${ctx.currentIndex} + ${amount}) mod 26 = ${ctx.calcIndex}.` : "Skipped because current character is not a letter."
      ]);
      break;
    }
    case "char_reflect_index":
      ctx.calcIndex = ctx.currentIndex >= 0 ? ctx.arrays.alphabet.length - 1 - ctx.currentIndex : -1;
      addInfoLog(ctx, "New position = 25 - position", [
        ctx.currentIndex >= 0 ? `25 - ${ctx.currentIndex} = ${ctx.calcIndex}.` : "Skipped because current character is not a letter."
      ]);
      break;
    case "out_clear":
      ctx.output = "";
      addInfoLog(ctx, "Create empty output text", ["Output text is now empty and ready to be built."]);
      break;
    case "out_append_current":
      ctx.output += ctx.currentChar;
      addInfoLog(ctx, "Append current character to output", [
        `Appended: ${showCharChange(ctx.currentChar)}.`,
        `Output now: ${formatMessageForLog(ctx.output)}.`
      ]);
      break;
    case "out_append_alphabet_index_or_original": {
      const changed = ctx.calcIndex >= 0 && ctx.calcIndex < ctx.arrays.alphabet.length;
      const newChar = changed ? preserveCase(ctx.arrays.alphabet[ctx.calcIndex], ctx.currentChar) : ctx.currentChar;
      ctx.output += newChar;
      addInfoLog(ctx, "Append alphabet[new position] or original", [
        changed ? `Alphabet[${ctx.calcIndex}] = ${newChar}.` : `Kept original character: ${showCharChange(ctx.currentChar)}.`,
        `Output now: ${formatMessageForLog(ctx.output)}.`
      ]);
      break;
    }
    case "out_append_custom_index_or_original": {
      const valid = ctx.currentIndex >= 0 && ctx.arrays.customAlphabet.length === 26;
      const newChar = valid ? preserveCase(ctx.arrays.customAlphabet[ctx.currentIndex], ctx.currentChar) : ctx.currentChar;
      ctx.output += newChar;
      addInfoLog(ctx, "Append scrambledAlphabet[position] or original", [
        valid ? `ScrambledAlphabet[${ctx.currentIndex}] = ${newChar}.` : "Kept original because the character is not A-Z or the scrambled alphabet is incomplete.",
        `Output now: ${formatMessageForLog(ctx.output)}.`
      ]);
      break;
    }
    case "message_from_output":
      before = ctx.message;
      ctx.message = ctx.output.replace(/\s+$/g, "");
      addChangeLog(ctx, "Replace message with output text", before, ctx.message, [
        "The output built by the loop becomes the new current message."
      ]);
      break;
    case "plug_swap_current": {
      const oldChar = ctx.currentChar;
      ctx.currentChar = swapSingleCharacter(ctx.currentChar, v.a, v.b);
      addInfoLog(ctx, "If current letter is A/B, swap it", [
        `Swap pair: ${singleLetter(v.a) || "?"} ↔ ${singleLetter(v.b) || "?"}.`,
        `Current character: ${showCharChange(oldChar)} → ${showCharChange(ctx.currentChar)}.`
      ]);
      break;
    }
    case "morse_lookup_encode_current": {
      const upper = String(ctx.currentChar || "").toUpperCase();
      ctx.currentCode = upper === " " ? "/" : (ctx.arrays.morse[upper] || ctx.currentChar);
      addInfoLog(ctx, "Look up current character in Morse table", [
        `Current character: ${showCharChange(ctx.currentChar)}.`,
        `Morse code: ${formatValueForLog(ctx.currentCode)}.`
      ]);
      break;
    }
    case "out_append_morse_current_with_space":
      ctx.output += `${ctx.currentCode} `;
      addInfoLog(ctx, "Append Morse code to output", [
        `Appended code: ${formatValueForLog(ctx.currentCode)}.`,
        `Output now: ${formatMessageForLog(ctx.output)}.`
      ]);
      break;
    case "morse_lookup_decode_current":
      ctx.currentChar = ctx.currentToken === "/" ? " " : (ctx.arrays.reverseMorse[ctx.currentToken] || "?");
      addInfoLog(ctx, "Look up current Morse code as letter", [
        `Current Morse code: ${formatValueForLog(ctx.currentToken)}.`,
        `Decoded character: ${showCharChange(ctx.currentChar)}.`
      ]);
      break;
    case "out_append_decoded_current":
      ctx.output += ctx.currentChar;
      addInfoLog(ctx, "Append decoded letter to output", [
        `Appended: ${showCharChange(ctx.currentChar)}.`,
        `Output now: ${formatMessageForLog(ctx.output)}.`
      ]);
      break;
    case "crypto_caesar": {
      before = ctx.message;
      const shift = Number(v.shift) || 0;
      ctx.message = shiftText(ctx.message, shift, ctx.arrays.alphabet);
      addChangeLog(ctx, "Caesar shift", before, ctx.message, [
        `Rule: move each alphabet letter by ${shift}.`,
        `Examples from this message: ${previewShiftExamples(before, shift, ctx.arrays.alphabet)}.`
      ]);
      break;
    }
    case "crypto_shift_variable": {
      before = ctx.message;
      const shift = Number(ctx.vars.shift) || 0;
      ctx.message = shiftText(ctx.message, shift, ctx.arrays.alphabet);
      addChangeLog(ctx, "Shift using variable", before, ctx.message, [
        `Read variable shift = ${shift}.`,
        `Rule: move each alphabet letter by ${shift}.`,
        `Examples from this message: ${previewShiftExamples(before, shift, ctx.arrays.alphabet)}.`
      ]);
      break;
    }
    case "crypto_rotor": {
      before = ctx.message;
      const position = Number(v.position) || 0;
      ctx.message = rotorShift(ctx.message, position, ctx.arrays.alphabet);
      addChangeLog(ctx, "Rotor shift", before, ctx.message, [
        `Starting rotor position: ${position}.`,
        "Rule: first letter shifts by the rotor position, then each next letter shifts 1 more.",
        `Examples from this message: ${previewRotorExamples(before, position, ctx.arrays.alphabet)}.`
      ]);
      break;
    }
    case "crypto_reflector":
      before = ctx.message;
      ctx.message = atbash(ctx.message, ctx.arrays.alphabet);
      addChangeLog(ctx, "Reflector A↔Z", before, ctx.message, [
        "Rule: letters are reflected across the alphabet: A↔Z, B↔Y, C↔X, and so on.",
        `Examples from this message: ${previewAtbashExamples(before, ctx.arrays.alphabet)}.`
      ]);
      break;
    case "crypto_plugboard": {
      before = ctx.message;
      const first = singleLetter(v.a);
      const second = singleLetter(v.b);
      ctx.message = plugboardSwap(ctx.message, v.a, v.b);
      addChangeLog(ctx, "Plugboard swap", before, ctx.message, [
        first && second && first !== second ? `Rule: swap every ${first} with ${second}, and every ${second} with ${first}.` : "Rule skipped: choose two different letters.",
        `Changed characters: ${countDifferentCharacters(before, ctx.message)}.`
      ]);
      break;
    }
    case "crypto_substitution": {
      before = ctx.message;
      if (ctx.arrays.customAlphabet.length !== 26) {
        addInfoLog(ctx, "Substitution skipped", [
          "The custom alphabet must contain 26 different letters.",
          `Current custom alphabet: ${ctx.arrays.customAlphabet}.`,
          `Length: ${ctx.arrays.customAlphabet.length}/26.`
        ]);
      } else {
        ctx.message = substituteText(ctx.message, ctx.arrays.alphabet, ctx.arrays.customAlphabet);
        addChangeLog(ctx, "Substitute with custom alphabet", before, ctx.message, [
          `Normal alphabet: ${ctx.arrays.alphabet}.`,
          `Custom alphabet: ${ctx.arrays.customAlphabet}.`,
          `Mapping preview: ${previewSubstitutionMap(ctx.arrays.alphabet, ctx.arrays.customAlphabet, 10)}.`
        ]);
      }
      break;
    }
    case "crypto_reverse":
      before = ctx.message;
      ctx.message = [...ctx.message].reverse().join("");
      addChangeLog(ctx, "Reverse message", before, ctx.message, [
        "Rule: the last character becomes first, and the first character becomes last."
      ]);
      break;
    case "crypto_swap_pairs":
      before = ctx.message;
      ctx.message = swapPairs(ctx.message);
      addChangeLog(ctx, "Swap letter pairs", before, ctx.message, [
        "Rule: characters are swapped in pairs: AB becomes BA, CD becomes DC, and so on.",
        `Pair preview before: ${previewPairs(before)}.`
      ]);
      break;
    case "crypto_morse_encode":
      before = ctx.message;
      ctx.message = morseEncode(ctx.message);
      addChangeLog(ctx, "Encode to Morse code", before, ctx.message, [
        "Rule: letters and numbers become dots and dashes. Spaces become /. This is encoding, not strong encryption.",
        `Examples from this message: ${previewMorseEncodeExamples(before)}.`
      ]);
      break;
    case "crypto_morse_decode":
      before = ctx.message;
      ctx.message = morseDecode(ctx.message);
      addChangeLog(ctx, "Decode Morse code", before, ctx.message, [
        "Rule: dots and dashes are translated back into letters. / becomes a space."
      ]);
      break;
    case "logic_password":
      addInfoLog(ctx, "Check password strength", [
        `Message checked: ${formatMessageForLog(ctx.message)}.`,
        passwordScore(ctx.message)
      ]);
      break;
    case "logic_contains": {
      const needle = (v.needle || "").toUpperCase();
      const found = ctx.message.toUpperCase().includes(needle);
      addInfoLog(ctx, "If message contains", [
        `Search text: ${formatValueForLog(needle)}.`,
        `Message checked: ${formatMessageForLog(ctx.message)}.`,
        found ? "Result: found." : "Result: not found."
      ]);
      break;
    }
    case "output_show":
      addInfoLog(ctx, "Show current message", [
        `Current output: ${formatMessageForLog(ctx.message)}.`,
        "This is the cipher text/encoded message after all blocks above it have finished."
      ]);
      break;
    case "output_note":
      addInfoLog(ctx, "Add note", [
        `Student note: ${formatValueForLog(v.note || "")}.`
      ]);
      break;
    default:
      addInfoLog(ctx, "Unknown block skipped", [`Block type: ${block.type}.`]);
  }
}

function addInfoLog(ctx, title, lines = []) {
  ctx.step = (ctx.step || 0) + 1;
  ctx.logs.push([`Step ${ctx.step}: ${title}`, ...lines].filter(Boolean).join("\n"));
}

function addChangeLog(ctx, title, before, after, lines = []) {
  const changed = before !== after;
  addInfoLog(ctx, title, [
    `Before: ${formatMessageForLog(before)}`,
    ...lines,
    `After: ${formatMessageForLog(after)}`,
    ...describeMessageChange(before, after),
    changed ? "Result: message changed." : "Result: message stayed the same."
  ]);
}

function describeMessageChange(before, after) {
  const left = String(before ?? "");
  const right = String(after ?? "");
  if (left === right) {
    return ["Change detail: no visible character or word changed."];
  }

  const leftChars = [...left];
  const rightChars = [...right];
  const max = Math.max(leftChars.length, rightChars.length);
  const differences = [];

  for (let index = 0; index < max; index++) {
    if (leftChars[index] !== rightChars[index]) {
      differences.push(`#${index + 1} ${showCharChange(leftChars[index])}→${showCharChange(rightChars[index])}`);
    }
  }

  const hiddenCount = Math.max(0, differences.length - 12);
  const characterLine = differences.length
    ? `Character changes: ${differences.slice(0, 12).join(", ")}${hiddenCount ? `, ... +${hiddenCount} more` : ""}.`
    : "Character changes: none.";

  const wordLine = describeWordChange(left, right);
  return [
    `Length: ${leftChars.length} → ${rightChars.length} characters.`,
    characterLine,
    wordLine
  ].filter(Boolean);
}

function describeWordChange(before, after) {
  const beforeWords = before.trim() ? before.trim().split(/\s+/) : [];
  const afterWords = after.trim() ? after.trim().split(/\s+/) : [];
  const max = Math.max(beforeWords.length, afterWords.length);
  if (max === 0) return "Word changes: no words to compare.";

  const changes = [];
  for (let index = 0; index < max; index++) {
    const beforeWord = beforeWords[index] ?? "(none)";
    const afterWord = afterWords[index] ?? "(none)";
    if (beforeWord !== afterWord) {
      changes.push(`#${index + 1} ${shortLogWord(beforeWord)}→${shortLogWord(afterWord)}`);
    }
    if (changes.length >= 6) break;
  }

  if (!changes.length) return `Word changes: word count ${beforeWords.length} → ${afterWords.length}, but visible words stayed the same.`;
  const remaining = Math.max(0, max - 6);
  return `Word changes: ${changes.join(", ")}${remaining ? `, ... +${remaining} more positions` : ""}.`;
}

function shortLogWord(word) {
  const text = String(word ?? "");
  if (!text) return "(empty)";
  return text.length > 24 ? `${text.slice(0, 24)}...` : text;
}

function showCharChange(char) {
  if (char === undefined || char === null || char === "") return "(nothing)";
  if (char === " ") return "(space)";
  if (char === "\n") return "(new line)";
  if (char === "\t") return "(tab)";
  return char;
}

function blockTitle(block) {
  const definition = block.definition || findDefinition(block.type);
  return definition ? definition.title : block.type;
}

function formatValueForLog(value) {
  if (value === undefined || value === null || value === "") return "(empty)";
  return String(value);
}

function formatMessageForLog(message) {
  const text = String(message ?? "");
  if (!text) return "(empty)";
  const safe = text.replace(/\n/g, "\\n");
  return safe.length > 180 ? `${safe.slice(0, 180)}...` : safe;
}

function previewShiftExamples(text, amount, alpha, limit = 8) {
  const usedAlpha = alpha || alphabet;
  const examples = [];
  [...text].forEach((char) => {
    if (examples.length >= limit) return;
    const upper = char.toUpperCase();
    const index = usedAlpha.indexOf(upper);
    if (index === -1) return;
    const shifted = usedAlpha[mod(index + amount, usedAlpha.length)];
    examples.push(`${upper}→${shifted}`);
  });
  return examples.length ? examples.join(", ") : "no A-Z letters to shift";
}

function previewRotorExamples(text, start, alpha, limit = 8) {
  const usedAlpha = alpha || alphabet;
  const examples = [];
  let letterCount = 0;
  [...text].forEach((char) => {
    const upper = char.toUpperCase();
    const index = usedAlpha.indexOf(upper);
    if (index === -1) return;
    const amount = start + letterCount;
    const shifted = usedAlpha[mod(index + amount, usedAlpha.length)];
    if (examples.length < limit) examples.push(`${upper} +${amount}→${shifted}`);
    letterCount += 1;
  });
  return examples.length ? examples.join(", ") : "no A-Z letters for the rotor";
}

function previewAtbashExamples(text, alpha, limit = 8) {
  const usedAlpha = alpha || alphabet;
  const examples = [];
  [...text].forEach((char) => {
    if (examples.length >= limit) return;
    const upper = char.toUpperCase();
    const index = usedAlpha.indexOf(upper);
    if (index === -1) return;
    examples.push(`${upper}→${usedAlpha[usedAlpha.length - 1 - index]}`);
  });
  return examples.length ? examples.join(", ") : "no A-Z letters to reflect";
}

function previewSubstitutionMap(from, to, limit = 8) {
  return [...from.slice(0, limit)].map((char, index) => `${char}→${to[index] || "?"}`).join(", ");
}

function previewPairs(text, limit = 6) {
  const pairs = [];
  const chars = [...text];
  for (let i = 0; i < chars.length - 1 && pairs.length < limit; i += 2) {
    pairs.push(`${chars[i]}${chars[i + 1]}→${chars[i + 1]}${chars[i]}`);
  }
  return pairs.length ? pairs.join(", ") : "not enough characters to swap";
}

function previewMorseEncodeExamples(text, limit = 8) {
  const examples = [];
  [...text.toUpperCase()].forEach((char) => {
    if (examples.length >= limit) return;
    if (char === " ") {
      examples.push("space→/");
    } else if (morseMap[char]) {
      examples.push(`${char}→${morseMap[char]}`);
    }
  });
  return examples.length ? examples.join(", ") : "no letters or numbers to encode";
}

function previewList(list, limit = 12) {
  const items = list.slice(0, limit).map((item) => item === " " ? "(space)" : String(item));
  return items.join(" | ") + (list.length > limit ? ` | ... +${list.length - limit} more` : "");
}

function countDifferentCharacters(before, after) {
  const left = [...String(before ?? "")];
  const right = [...String(after ?? "")];
  const max = Math.max(left.length, right.length);
  let count = 0;
  for (let i = 0; i < max; i++) {
    if (left[i] !== right[i]) count += 1;
  }
  return count;
}

function renderOutput(ctx) {
  liveMessage.value = ctx.message;
  typeRunLog(ctx.logs);
}

function typeRunLog(items) {
  latestLogItems = [...items];
  const token = ++logTypingToken;
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  runLog.innerHTML = "";
  if (skipLogBtn) skipLogBtn.hidden = !items.length;

  if (reduceMotion) {
    renderLogImmediately(items);
    return;
  }

  const listItems = items.map((item) => {
    const li = document.createElement("li");
    li.dataset.fullText = item;
    li.textContent = "";
    runLog.appendChild(li);
    return li;
  });

  let itemIndex = 0;
  let charIndex = 0;

  function tick() {
    if (token !== logTypingToken) return;
    if (itemIndex >= listItems.length) {
      if (skipLogBtn) skipLogBtn.hidden = true;
      return;
    }

    const li = listItems[itemIndex];
    const fullText = li.dataset.fullText || "";
    li.classList.add("typing");

    const remaining = fullText.length - charIndex;
    const chunkSize = fullText.length > 900 ? 5 : fullText.length > 400 ? 4 : 3;
    charIndex = Math.min(fullText.length, charIndex + Math.min(chunkSize, remaining));
    li.textContent = fullText.slice(0, charIndex);
    runLog.scrollTop = runLog.scrollHeight;

    if (charIndex >= fullText.length) {
      li.classList.remove("typing");
      itemIndex += 1;
      charIndex = 0;
      window.setTimeout(tick, 90);
    } else {
      window.setTimeout(tick, 8);
    }
  }

  tick();
}

function renderLogImmediately(items) {
  runLog.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    runLog.appendChild(li);
  });
  runLog.scrollTop = runLog.scrollHeight;
}

function finishTypingLog() {
  if (!latestLogItems.length) return;
  logTypingToken += 1;
  renderLogImmediately(latestLogItems);
  if (skipLogBtn) skipLogBtn.hidden = true;
}

function updatePseudoCode() {
  const blocks = getProgramBlocks();
  if (blocks.length === 0) {
    pseudoCode.textContent = "No blocks yet.";
    return;
  }

  pseudoCode.textContent = blocks.map((block, index) => {
    const title = block.definition?.title || block.type;
    const fields = Object.entries(block.values)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    return `${index + 1}. ${title}${fields ? ` (${fields})` : ""}`;
  }).join("\n");
}

function getSerializableBlocks() {
  return getProgramBlocks().map((block) => ({ type: block.type, values: block.values }));
}

function saveProgram() {
  const blocks = getSerializableBlocks();
  localStorage.setItem("cyberblock-program", JSON.stringify(blocks));
  showAppMessage("Program saved", [
    "Your blocks were saved inside this app/browser on this device.",
    "Use Export if you want to move the project to another computer."
  ]);
}

function loadProgram() {
  const data = localStorage.getItem("cyberblock-program");
  if (!data) {
    showAppMessage("No saved program yet", [
      "Click Save after building a program.",
      "If you have a project file, use Import instead."
    ]);
    return;
  }

  try {
    const blocks = JSON.parse(data);
    loadBlocks(blocks);
    showAppMessage("Program loaded", [
      `Loaded ${blocks.length} block(s) from this app/browser.`
    ]);
  } catch (error) {
    showAppMessage("Load failed", [
      "The saved program could not be read.",
      "Try importing a valid .cyberblock file instead."
    ]);
  }
}

function exportProgram() {
  const blocks = getSerializableBlocks();
  if (!blocks.length) {
    showAppMessage("Nothing to export", [
      "Add some blocks to the Workspace first."
    ]);
    return;
  }

  const project = {
    app: "CyberBlock Lab",
    version: "0.2.0",
    exportedAt: new Date().toISOString(),
    blocks
  };
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  link.href = URL.createObjectURL(blob);
  link.download = `cyberblock-project-${dateStamp}.cyberblock`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);

  showAppMessage("Project exported", [
    "A .cyberblock project file was created.",
    "Students can bring this file to another device and use Import to continue."
  ]);
}

function importProgramFromFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      const blocks = Array.isArray(parsed) ? parsed : parsed.blocks;
      if (!Array.isArray(blocks)) throw new Error("Missing blocks array.");
      loadBlocks(blocks);
      showAppMessage("Project imported", [
        `Imported ${blocks.length} block(s) from ${file.name}.`,
        "Run the program to check the result."
      ]);
    } catch (error) {
      showAppMessage("Import failed", [
        "This file is not a valid CyberBlock project.",
        "Use a .cyberblock file exported from this app."
      ]);
    } finally {
      event.target.value = "";
    }
  };
  reader.onerror = () => {
    showAppMessage("Import failed", [
      "The file could not be opened."
    ]);
    event.target.value = "";
  };
  reader.readAsText(file);
}

function loadBlocks(blocks) {
  workspace.querySelectorAll(".program-block").forEach((block) => block.remove());
  blocks.forEach((block) => {
    const node = createProgramBlock(block.type, block.values || {});
    if (node) workspace.appendChild(node);
  });
  updateWorkspaceState();
  updatePseudoCode();
}

const learningSamples = {
  cleanText: [
    { type: "event_input", values: { message: "Meet Me After Class" } },
    { type: "text_uppercase", values: {} },
    { type: "text_remove_spaces", values: {} },
    { type: "output_note", values: { note: "Clean Text sample: prepare a message before encryption." } },
    { type: "output_show", values: {} }
  ],
  reverse: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "list_message_chars", values: {} },
    { type: "list_reverse_chars", values: {} },
    { type: "list_join_chars_to_message", values: {} },
    { type: "output_note", values: { note: "Reverse sample: turn the message into a list, reverse the list, then join it back." } },
    { type: "output_show", values: {} }
  ],
  swapPairs: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "list_message_chars", values: {} },
    { type: "list_swap_pairs", values: {} },
    { type: "list_join_chars_to_message", values: {} },
    { type: "output_note", values: { note: "Swap Pairs sample: AB becomes BA, CD becomes DC." } },
    { type: "output_show", values: {} }
  ],
  caesarPieces: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_shift_index_by_number", values: { amount: 3 } },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Caesar +3 sample: find each letter position, add 3, then wrap around with mod 26." } },
    { type: "output_show", values: {} }
  ],
  shiftVariable: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "var_set", values: { varName: "shift", varValue: "5" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_shift_index_by_variable", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Shift Variable sample: the Caesar shift comes from the variable named shift." } },
    { type: "output_show", values: {} }
  ],
  keyToShift: [
    { type: "event_input", values: { message: "HELLO CYBER CLUB" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "key_set_word", values: { keyText: "CAT" } },
    { type: "key_clear_total", values: {} },
    { type: "loop_each_key_char", values: {} },
    { type: "key_letter_value", values: {} },
    { type: "key_add_letter_value_to_total", values: {} },
    { type: "loop_each_key_char_end", values: {} },
    { type: "key_total_to_shift", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_shift_index_by_variable", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Key → Shift sample: CAT becomes C=3, A=1, T=20, total 24, then shift = 24 mod 26." } },
    { type: "output_show", values: {} }
  ],
  reflector: [
    { type: "event_input", values: { message: "ABC XYZ" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_reflect_index", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Reflector sample: use 25 - position so A↔Z, B↔Y, C↔X." } },
    { type: "output_show", values: {} }
  ],
  plugboard: [
    { type: "event_input", values: { message: "MEET ME AFTER CLASS" } },
    { type: "text_uppercase", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "plug_swap_current", values: { a: "M", b: "Z" } },
    { type: "out_append_current", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Plugboard sample: M swaps with Z before being appended to the output." } },
    { type: "output_show", values: {} }
  ],
  customSubstitution: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "array_custom", values: { customAlphabet: "QWERTYUIOPASDFGHJKLZXCVBNM" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "out_append_custom_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Substitution sample: find the position in A-Z, then take the same position from the scrambled alphabet." } },
    { type: "output_show", values: {} }
  ],
  keywordSubstitution: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "array_keyword", values: { keyword: "DRAGON" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "out_append_custom_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Keyword Alphabet sample: DRAGON builds the scrambled alphabet before substitution starts." } },
    { type: "output_show", values: {} }
  ],
  rotor: [
    { type: "event_input", values: { message: "HELLO CYBER" } },
    { type: "text_uppercase", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "var_set", values: { varName: "rotor", varValue: "4" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_rotor_shift_index", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Rotor sample: shift amount = rotor position + letter count, so every next letter changes differently." } },
    { type: "output_show", values: {} }
  ],
  morseEncode: [
    { type: "event_input", values: { message: "SOS HELP" } },
    { type: "text_uppercase", values: {} },
    { type: "morse_table", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "morse_lookup_encode_current", values: {} },
    { type: "out_append_morse_current_with_space", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Morse Encode sample: letters become dots and dashes; spaces become /." } },
    { type: "output_show", values: {} }
  ],
  morseDecode: [
    { type: "event_input", values: { message: "... --- ... / .... . .-.. .--." } },
    { type: "morse_reverse_table", values: {} },
    { type: "token_split_morse", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_token", values: {} },
    { type: "morse_lookup_decode_current", values: {} },
    { type: "out_append_decoded_current", values: {} },
    { type: "loop_each_token_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "Morse Decode sample: split codes by spaces, then look each code up in the reverse table." } },
    { type: "output_show", values: {} }
  ]
};

function loadLearningSample(name) {
  const sample = learningSamples[name];
  if (!sample) {
    showAppMessage("Sample not found", ["This sample is not available yet."]);
    return;
  }
  loadBlocks(sample);
  runProgram();
}

function loadCaesarSample() {
  loadLearningSample("keyToShift");
}

function loadMiniEnigmaSample() {
  loadBlocks([
    { type: "event_input", values: { message: "MEET ME AFTER CLASS" } },
    { type: "text_uppercase", values: {} },
    { type: "text_remove_spaces", values: {} },
    { type: "array_alphabet", values: {} },
    { type: "array_keyword", values: { keyword: "DRAGON" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "plug_swap_current", values: { a: "M", b: "Z" } },
    { type: "char_get_alphabet_index", values: {} },
    { type: "out_append_custom_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "var_set", values: { varName: "rotor", varValue: "4" } },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_rotor_shift_index", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "out_clear", values: {} },
    { type: "loop_each_char", values: {} },
    { type: "char_get_alphabet_index", values: {} },
    { type: "char_reflect_index", values: {} },
    { type: "out_append_alphabet_index_or_original", values: {} },
    { type: "loop_each_char_end", values: {} },
    { type: "message_from_output", values: {} },
    { type: "output_note", values: { note: "This mini machine is built from small pieces: plugboard, substitution, rotor, and reflector." } },
    { type: "output_show", values: {} }
  ]);
  runProgram();
}

function shiftText(text, amount, alpha) {
  const usedAlpha = alpha || alphabet;
  return [...text].map((char) => {
    const upper = char.toUpperCase();
    const index = usedAlpha.indexOf(upper);
    if (index === -1) return char;
    const shifted = usedAlpha[mod(index + amount, usedAlpha.length)];
    return char === upper ? shifted : shifted.toLowerCase();
  }).join("");
}

function rotorShift(text, start, alpha) {
  let letterCount = 0;
  return [...text].map((char) => {
    if (!/[a-z]/i.test(char)) return char;
    const shifted = shiftText(char, start + letterCount, alpha);
    letterCount += 1;
    return shifted;
  }).join("");
}

function atbash(text, alpha) {
  const usedAlpha = alpha || alphabet;
  return [...text].map((char) => {
    const upper = char.toUpperCase();
    const index = usedAlpha.indexOf(upper);
    if (index === -1) return char;
    const reflected = usedAlpha[usedAlpha.length - 1 - index];
    return char === upper ? reflected : reflected.toLowerCase();
  }).join("");
}

function plugboardSwap(text, a, b) {
  return [...text].map((char) => swapSingleCharacter(char, a, b)).join("");
}

function swapSingleCharacter(char, a, b) {
  const first = singleLetter(a);
  const second = singleLetter(b);
  if (!first || !second || first === second) return char;
  const upper = String(char || "").toUpperCase();
  if (upper === first) return char === upper ? second : second.toLowerCase();
  if (upper === second) return char === upper ? first : first.toLowerCase();
  return char;
}

function substituteText(text, from, to) {
  return [...text].map((char) => {
    const upper = char.toUpperCase();
    const index = from.indexOf(upper);
    if (index === -1) return char;
    const subbed = to[index];
    return char === upper ? subbed : subbed.toLowerCase();
  }).join("");
}

function swapPairs(text) {
  return swapPairsArray([...text]).join("");
}

function swapPairsArray(chars) {
  const result = [...chars];
  for (let i = 0; i < result.length - 1; i += 2) {
    [result[i], result[i + 1]] = [result[i + 1], result[i]];
  }
  return result;
}

function morseEncode(text) {
  return [...text.toUpperCase()].map((char) => {
    if (char === " ") return "/";
    return morseMap[char] || char;
  }).join(" ");
}

function morseDecode(text) {
  return text.trim().split(/\s+/).map((code) => {
    if (code === "/") return " ";
    return reverseMorseMap[code] || "?";
  }).join("");
}

function passwordScore(text) {
  let score = 0;
  if (text.length >= 8) score += 1;
  if (/[A-Z]/.test(text)) score += 1;
  if (/[a-z]/.test(text)) score += 1;
  if (/\d/.test(text)) score += 1;
  if (/[^A-Za-z0-9]/.test(text)) score += 1;

  const level = score <= 2 ? "weak" : score <= 4 ? "medium" : "strong";
  return `Password strength check: ${level} (${score}/5).`;
}

function keywordAlphabet(keyword) {
  const clean = cleanAlphabet(keyword);
  let result = "";
  [...clean + alphabet].forEach((char) => {
    if (!result.includes(char)) result += char;
  });
  return result;
}

function cleanAlphabet(value) {
  let result = "";
  [...String(value || "").toUpperCase()].forEach((char) => {
    if (/[A-Z]/.test(char) && !result.includes(char)) result += char;
  });
  return result;
}

function singleLetter(value) {
  const match = String(value || "").toUpperCase().match(/[A-Z]/);
  return match ? match[0] : "";
}

function preserveCase(newChar, originalChar) {
  return originalChar === String(originalChar).toLowerCase() && originalChar !== String(originalChar).toUpperCase()
    ? newChar.toLowerCase()
    : newChar;
}

function mod(number, divisor) {
  return ((number % divisor) + divisor) % divisor;
}

function clampNumber(number, min, max) {
  if (Number.isNaN(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

init();
