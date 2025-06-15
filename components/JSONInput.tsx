'use client'

import React, { useState } from 'react'
import { Question } from '@/types/quiz'

interface JSONInputProps {
  onQuestionsLoaded: (questions: Question[]) => void
  onClose: () => void
}

export default function JSONInput({ onQuestionsLoaded, onClose }: JSONInputProps) {
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showFormat, setShowFormat] = useState(false)
  const [copied, setCopied] = useState(false)

  const validateQuestion = (q: unknown, index: number): string | null => {
    if (!q || typeof q !== 'object') {
      return `Question ${index + 1}: Invalid question object`
    }
    const question = q as Record<string, unknown>
    if (!question.id || typeof question.id !== 'number') {
      return `Question ${index + 1}: Missing or invalid id (must be a number)`
    }
    if (!question.question || typeof question.question !== 'string') {
      return `Question ${index + 1}: Missing or invalid question text`
    }
    if (!question.options || typeof question.options !== 'object') {
      return `Question ${index + 1}: Missing or invalid options object`
    }
    const optionKeys = ['A', 'B', 'C', 'D']
    const providedOptions = Object.keys(question.options as Record<string, unknown>).filter(key => optionKeys.includes(key))
    if (providedOptions.length < 2) {
      return `Question ${index + 1}: Must have at least 2 options`
    }
    if (!question.correctAnswer || typeof question.correctAnswer !== 'string' || !optionKeys.includes(question.correctAnswer)) {
      return `Question ${index + 1}: Invalid correctAnswer (must be A, B, C, or D)`
    }
    if (!providedOptions.includes(question.correctAnswer as string)) {
      return `Question ${index + 1}: correctAnswer "${question.correctAnswer}" not found in provided options`
    }
    if (!question.explanation || typeof question.explanation !== 'string') {
      return `Question ${index + 1}: Missing or invalid explanation`
    }
    if (!question.category || typeof question.category !== 'string') {
      return `Question ${index + 1}: Missing or invalid category`
    }
    if (!question.difficulty || typeof question.difficulty !== 'string' || !['easy', 'medium', 'hard'].includes(question.difficulty)) {
      return `Question ${index + 1}: Invalid difficulty (must be easy, medium, or hard)`
    }
    return null
  }

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonText)
      
      if (!Array.isArray(parsed)) {
        setError('JSON must be an array of questions')
        return
      }

      if (parsed.length === 0) {
        setError('Please provide at least one question')
        return
      }

      // Validate each question
      for (let i = 0; i < parsed.length; i++) {
        const validationError = validateQuestion(parsed[i], i)
        if (validationError) {
          setError(validationError)
          return
        }
      }

      // Check for duplicate IDs
      const ids = parsed.map((q: unknown) => (q as Record<string, unknown>).id)
      const uniqueIds = new Set(ids)
      if (ids.length !== uniqueIds.size) {
        setError('Duplicate question IDs found. Each question must have a unique ID.')
        return
      }

      setError(null)
      onQuestionsLoaded(parsed as Question[])
    } catch {
      setError('Invalid JSON format. Please check your syntax.')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setJsonText(text)
      setError(null)
    }
    reader.readAsText(file)
  }

  const formatDocumentation = `# JSON Question Format Documentation

## JSON Structure

The JSON file must contain an array of question objects. Each question object must follow this exact structure:

\`\`\`json
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
\`\`\`

## Field Specifications

### Required Fields

1. **\`id\`** (number)
   - Unique identifier for each question
   - Must be a positive integer
   - No duplicates allowed in the same file

2. **\`question\`** (string)
   - The question text to display
   - Should end with a question mark
   - Maximum recommended length: 200 characters

3. **\`options\`** (object)
   - Contains the answer choices
   - Must have at least 2 options, maximum 4
   - Keys must be "A", "B", "C", or "D"
   - Values are strings containing the answer text
   - Empty or null values are not allowed

4. **\`correctAnswer\`** (string)
   - Must be one of: "A", "B", "C", or "D"
   - Must correspond to an existing option key
   - Only single correct answers are supported

5. **\`explanation\`** (string)
   - Detailed explanation of why the correct answer is correct
   - Shown after the user answers
   - Should be educational and clear

6. **\`category\`** (string)
   - Topic or module the question belongs to
   - Used for grouping and filtering questions
   - Examples: "Network Access Control", "Transport Layer", "IP Addressing"

7. **\`difficulty\`** (string)
   - Must be one of: "easy", "medium", or "hard"
   - Affects scoring calculations
   - Case-sensitive

## Complete Example

\`\`\`json
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
    "explanation": "TCP operates at Layer 4 (Transport Layer) of the OSI model.",
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
    "explanation": "Class B networks use a default subnet mask of 255.255.0.0.",
    "category": "IP Addressing",
    "difficulty": "medium"
  }
]
\`\`\`

## Validation Rules

1. **JSON Syntax**: Must be valid JSON (use a JSON validator)
2. **Array Format**: Root element must be an array \`[]\`
3. **Unique IDs**: Each question must have a unique \`id\`
4. **Valid Options**: At least 2 options required (A and B minimum)
5. **Matching Answer**: \`correctAnswer\` must exist in \`options\`
6. **Required Fields**: All fields listed above are mandatory
7. **String Values**: All text fields must be non-empty strings
8. **Difficulty Values**: Only "easy", "medium", or "hard" are accepted`

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatDocumentation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      {showFormat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4">
              <h2 className="text-2xl font-bold text-gray-800">JSON Format Documentation</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowFormat(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none p-1"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <h3>JSON Structure</h3>
              <p>The JSON file must contain an array of question objects. Each question object must follow this exact structure:</p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`[
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
]`}
              </pre>
              
              <h3>Required Fields</h3>
              <ul>
                <li><strong>id</strong> (number): Unique identifier for each question</li>
                <li><strong>question</strong> (string): The question text to display</li>
                <li><strong>options</strong> (object): Contains answer choices (A, B, C, D)</li>
                <li><strong>correctAnswer</strong> (string): Must be &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, or &quot;D&quot;</li>
                <li><strong>explanation</strong> (string): Explanation shown after answering</li>
                <li><strong>category</strong> (string): Topic grouping (e.g., &quot;Network Layer&quot;)</li>
                <li><strong>difficulty</strong> (string): Must be &quot;easy&quot;, &quot;medium&quot;, or &quot;hard&quot;)</li>
              </ul>

              <h3>Validation Rules</h3>
              <ul>
                <li>Must be valid JSON syntax</li>
                <li>Root element must be an array</li>
                <li>Each question must have a unique ID</li>
                <li>At least 2 options required (A and B minimum)</li>
                <li>correctAnswer must exist in options</li>
                <li>All fields are mandatory</li>
                <li>Difficulty must be exactly &quot;easy&quot;, &quot;medium&quot;, or &quot;hard&quot;</li>
              </ul>

              <h3>Example with Multiple Questions</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`[
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
    "explanation": "TCP operates at Layer 4 (Transport Layer) of the OSI model.",
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
    "explanation": "Class B networks use a default subnet mask of 255.255.0.0.",
    "category": "IP Addressing",
    "difficulty": "medium"
  }
]`}
              </pre>
            </div>
          </div>
        </div>
      )}
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Import Questions</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload JSON file or paste JSON text
            </label>
            <button
              onClick={() => setShowFormat(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              View Format Documentation
            </button>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="mb-4 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value)
              setError(null)
            }}
            placeholder="Paste your JSON here..."
            className="flex-1 w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleParse}
            disabled={!jsonText.trim()}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Load Questions
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  )
}