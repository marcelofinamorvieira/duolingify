# JSON Question Format Documentation

This document describes the expected JSON format for importing questions into the Duolingo-Style Quiz application.

## JSON Structure

The JSON file must contain an array of question objects. Each question object must follow this exact structure:

```json
[
  {
    "id": 1,
    "question": "What is the primary function of the Transport Layer?",
    "options": {
      "A": "Physical transmission of data",
      "B": "End-to-end communication and error recovery",
      "C": "Routing packets across networks",
      "D": "Data encryption"
    },
    "correctAnswer": "B",
    "explanation": "The Transport Layer provides end-to-end communication services and ensures reliable data transfer between applications.",
    "category": "Transport Layer",
    "difficulty": "medium"
  }
]
```

## Field Specifications

### Required Fields

1. **`id`** (number)
   - Unique identifier for each question
   - Must be a positive integer
   - No duplicates allowed in the same file

2. **`question`** (string)
   - The question text to display
   - Should end with a question mark
   - Maximum recommended length: 200 characters

3. **`options`** (object)
   - Contains the answer choices
   - Must have at least 2 options, maximum 4
   - Keys must be "A", "B", "C", or "D"
   - Values are strings containing the answer text
   - Empty or null values are not allowed

4. **`correctAnswer`** (string)
   - Must be one of: "A", "B", "C", or "D"
   - Must correspond to an existing option key
   - Only single correct answers are supported

5. **`explanation`** (string)
   - Detailed explanation of why the correct answer is correct
   - Shown after the user answers
   - Should be educational and clear

6. **`category`** (string)
   - Topic or module the question belongs to
   - Used for grouping and filtering questions
   - Examples: "Network Access Control", "Transport Layer", "IP Addressing"

7. **`difficulty`** (string)
   - Must be one of: "easy", "medium", or "hard"
   - Affects scoring calculations
   - Case-sensitive

## Example Categories

Categories can be customized based on your subject matter. Examples:
- Mathematics: Algebra, Geometry, Calculus, Statistics
- Science: Biology, Chemistry, Physics, Earth Science
- History: Ancient History, World Wars, American History, European History
- Languages: Grammar, Vocabulary, Literature, Conversation
- Computer Science: Algorithms, Data Structures, Programming, Databases
- Geography: Countries, Capitals, Physical Geography, Climate
- Arts: Music Theory, Art History, Film Studies, Literature

## Complete Example

Here's a complete example with multiple questions:

```json
[
  {
    "id": 1,
    "question": "Which protocol operates at the Transport Layer?",
    "options": {
      "A": "HTTP",
      "B": "TCP",
      "C": "IP",
      "D": "Ethernet"
    },
    "correctAnswer": "B",
    "explanation": "TCP (Transmission Control Protocol) operates at Layer 4 (Transport Layer) of the OSI model.",
    "category": "Transport Layer",
    "difficulty": "easy"
  },
  {
    "id": 2,
    "question": "What is the default subnet mask for a Class B network?",
    "options": {
      "A": "255.0.0.0",
      "B": "255.255.0.0",
      "C": "255.255.255.0",
      "D": "255.255.255.255"
    },
    "correctAnswer": "B",
    "explanation": "Class B networks use a default subnet mask of 255.255.0.0, which provides 16 bits for the network portion.",
    "category": "IP Addressing",
    "difficulty": "medium"
  },
  {
    "id": 3,
    "question": "Which routing protocol uses the Bellman-Ford algorithm?",
    "options": {
      "A": "OSPF",
      "B": "BGP",
      "C": "RIP",
      "D": "EIGRP"
    },
    "correctAnswer": "C",
    "explanation": "RIP (Routing Information Protocol) uses the Bellman-Ford distance vector algorithm to calculate the best path.",
    "category": "Routing Protocols",
    "difficulty": "hard"
  }
]
```

## Validation Rules

1. **JSON Syntax**: Must be valid JSON (use a JSON validator)
2. **Array Format**: Root element must be an array `[]`
3. **Unique IDs**: Each question must have a unique `id`
4. **Valid Options**: At least 2 options required (A and B minimum)
5. **Matching Answer**: `correctAnswer` must exist in `options`
6. **Required Fields**: All fields listed above are mandatory
7. **String Values**: All text fields must be non-empty strings
8. **Difficulty Values**: Only "easy", "medium", or "hard" are accepted

## Tips for Creating Questions

1. **Clear Questions**: Write unambiguous questions that test one concept
2. **Plausible Options**: All options should be plausible to avoid obvious answers
3. **Helpful Explanations**: Provide educational value in explanations
4. **Consistent Categories**: Use consistent category names for better organization
5. **Balanced Difficulty**: Include a mix of easy, medium, and hard questions
6. **Varied Topics**: Cover different aspects of the subject matter

## Common Errors to Avoid

1. Missing required fields
2. Duplicate question IDs
3. Invalid difficulty values (e.g., "intermediate" instead of "medium")
4. correctAnswer referring to a non-existent option
5. Empty option values
6. Invalid JSON syntax (missing commas, quotes, brackets)
7. Using option keys other than A, B, C, D