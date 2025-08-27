# PendantSystemManager Component Structure

This directory contains the refactored PendantSystemManager component with a modular architecture.

## Folder Structure

```
PendantSystemManager/
├── index.jsx                    # Main component entry point
├── components/                  # Reusable UI components
│   ├── TabNavigation.jsx       # Tab navigation with filtering
│   ├── ProductTable.jsx        # Product display table
│   ├── AddModal.jsx            # Add new product modal
│   ├── EditModal.jsx           # Edit existing product modal
│   ├── CategorySelection.jsx   # Product category selection
│   ├── SystemTypeSelection.jsx # System type selection
│   ├── ProductDetailsForm.jsx  # Product details form
│   └── MediaUploadSection.jsx  # Image and 3D model uploads
├── utils/                      # Utility functions
│   ├── nameGenerator.js        # Random name generation
│   └── fileUtils.js           # File handling and filtering utilities
└── README.md                   # This documentation
```

## Components Overview

### Main Component (`index.jsx`)
- Entry point for the PendantSystemManager
- Manages state and coordinates between child components
- Handles business logic for CRUD operations

### UI Components (`components/`)

#### `TabNavigation.jsx`
- Renders filterable tabs (All, Pendants, Systems, etc.)
- Shows item counts for each category
- Handles tab switching logic

#### `ProductTable.jsx`
- Displays products in a table format
- Supports both pendant and system product types
- Includes edit/delete actions

#### `AddModal.jsx` & `EditModal.jsx`
- Modal dialogs for adding/editing products
- Composed of smaller form components
- Handles file uploads and form validation

#### Form Components
- `CategorySelection.jsx`: Choose between pendant or system
- `SystemTypeSelection.jsx`: Select system type (bar, ball, universal)
- `ProductDetailsForm.jsx`: Basic product information
- `MediaUploadSection.jsx`: Image and 3D model uploads

### Utilities (`utils/`)

#### `nameGenerator.js`
- Generates unique random names for products
- Ensures no duplicates in existing product list

#### `fileUtils.js`
- File conversion utilities (base64 to binary)
- Product filtering logic by tab type
- Tab count calculations

## Usage

Import the main component:
```javascript
import PendantSystemManager from "./PendantSystemManager";
```

The component accepts the same props as the original monolithic version, ensuring backward compatibility.

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused across the application
3. **Maintainability**: Easier to locate and fix issues
4. **Testability**: Individual components can be tested in isolation
5. **Scalability**: Easy to add new features or modify existing ones
6. **Code Organization**: Clear separation of concerns

## Migration Notes

- The main import path remains the same: `"./PendantSystemManager"`
- All existing props and functionality are preserved
- No breaking changes to the parent component (CustomerDashboard)
