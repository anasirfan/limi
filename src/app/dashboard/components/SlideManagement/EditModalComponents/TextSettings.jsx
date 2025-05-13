import React from 'react';

/**
 * TextSettings component for managing text content settings
 * Designed with the user's preference for minimal text and maximum visual impact
 */
const TextSettings = ({ formState, setFormState, editingSlide, dispatch }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-white mb-3">Text Content</h3>
      <p className="text-xs text-gray-400 mb-3">
        For best visual impact, keep text minimal and focus on high-quality images and videos
      </p>
      
      {/* Heading Settings */}
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="showHeading"
            checked={formState.text.showHeading}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  showHeading: e.target.checked
                }
              });
              
              // Update Redux state
              if (!editingSlide.text) {
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text',
                    value: { showHeading: e.target.checked }
                  }
                });
              } else {
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text.showHeading',
                    value: e.target.checked
                  }
                });
              }
            }}
            className="mr-2"
          />
          <label htmlFor="showHeading" className="text-gray-300">Show Heading</label>
        </div>
        
        <input
          type="text"
          value={formState.text.heading}
          onChange={(e) => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              text: {
                ...formState.text,
                heading: e.target.value
              }
            });
            
            // Update Redux state
            if (!editingSlide.text) {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text',
                  value: { heading: e.target.value }
                }
              });
            } else {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.heading',
                  value: e.target.value
                }
              });
            }
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
          placeholder="Main Heading"
        />
      </div>
      
      {/* Subheading Settings */}
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="showSubheading"
            checked={formState.text.showSubheading}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  showSubheading: e.target.checked
                }
              });
              
              // Update Redux state
              if (!editingSlide.text) {
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text',
                    value: { showSubheading: e.target.checked }
                  }
                });
              } else {
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text.showSubheading',
                    value: e.target.checked
                  }
                });
              }
            }}
            className="mr-2"
          />
          <label htmlFor="showSubheading" className="text-gray-300">Show Subheading</label>
        </div>
        
        <input
          type="text"
          value={formState.text.subheading}
          onChange={(e) => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              text: {
                ...formState.text,
                subheading: e.target.value
              }
            });
            
            // Update Redux state
            if (!editingSlide.text) {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text',
                  value: { subheading: e.target.value }
                }
              });
            } else {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.subheading',
                  value: e.target.value
                }
              });
            }
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
          placeholder="Subheading"
        />
      </div>
      
      {/* Description Settings */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-gray-300">Description (Max 300 characters)</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showDescription"
              checked={formState.text.showDescription}
              onChange={(e) => {
                // Update local form state immediately for UI feedback
                setFormState({
                  ...formState,
                  text: {
                    ...formState.text,
                    showDescription: e.target.checked
                  }
                });
                
                // Update Redux state
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text.showDescription',
                    value: e.target.checked
                  }
                });
              }}
              className="mr-2"
            />
            <label htmlFor="showDescription" className="text-gray-300">Show Description</label>
          </div>
        </div>
        
        <textarea
          value={formState.text.description}
          onChange={(e) => {
            // Limit to 300 characters
            const limitedText = e.target.value.slice(0, 300);
            
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              text: {
                ...formState.text,
                description: limitedText
              }
            });
            
            // Update Redux state
            if (!editingSlide.text) {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text',
                  value: { description: limitedText }
                }
              });
            } else {
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.description',
                  value: limitedText
                }
              });
            }
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md h-24"
          placeholder="Detailed description..."
          maxLength={300}
        />
        <div className="flex justify-end">
          <span className="text-xs text-gray-400 mt-1">
            {formState.text.description.length}/300
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Consider keeping descriptions brief for better visual impact
        </p>
      </div>
      
      {/* Text Alignment */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Text Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  alignment: 'left'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.alignment',
                  value: 'left'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.alignment === 'left' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Left
          </button>
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  alignment: 'center'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.alignment',
                  value: 'center'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.alignment === 'center' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Center
          </button>
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  alignment: 'right'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.alignment',
                  value: 'right'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.alignment === 'right' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Right
          </button>
        </div>
      </div>
      
      {/* Vertical Position */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Vertical Position</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  verticalPosition: 'top'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.verticalPosition',
                  value: 'top'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.verticalPosition === 'top' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Top
          </button>
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  verticalPosition: 'center'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.verticalPosition',
                  value: 'center'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.verticalPosition === 'center' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Center
          </button>
          <button
            onClick={() => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  verticalPosition: 'bottom'
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.verticalPosition',
                  value: 'bottom'
                }
              });
            }}
            className={`p-2 rounded-md ${formState.text.verticalPosition === 'bottom' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
          >
            Bottom
          </button>
        </div>
      </div>
      
      {/* Bullet Points */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-gray-300">Bullet Points</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showBullets"
              checked={formState.text.showBullets}
              onChange={(e) => {
                // Update local form state immediately for UI feedback
                setFormState({
                  ...formState,
                  text: {
                    ...formState.text,
                    showBullets: e.target.checked
                  }
                });
                
                // Update Redux state
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'text.showBullets',
                    value: e.target.checked
                  }
                });
              }}
              className="mr-2"
            />
            <label htmlFor="showBullets" className="text-gray-300">Show Bullets</label>
          </div>
        </div>
        
        {formState.text.showBullets && (
          <div>
            <div className="space-y-2 mb-2">
              {formState.text.bullets && formState.text.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={bullet || ''}
                    onChange={(e) => {
                      // Update local form state immediately for UI feedback
                      const newBullets = [...formState.text.bullets];
                      newBullets[index] = e.target.value;
                      setFormState({
                        ...formState,
                        text: {
                          ...formState.text,
                          bullets: newBullets
                        }
                      });
                      
                      // Update Redux state
                      dispatch({
                        type: 'slides/updateSlide',
                        payload: {
                          id: editingSlide.id,
                          field: 'text.bullets',
                          value: newBullets
                        }
                      });
                    }}
                    className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                    placeholder={`Bullet point ${index + 1}`}
                    maxLength={50}
                  />
                  <button
                    onClick={() => {
                      // Update local form state immediately for UI feedback
                      const newBullets = [...formState.text.bullets];
                      newBullets.splice(index, 1);
                      setFormState({
                        ...formState,
                        text: {
                          ...formState.text,
                          bullets: newBullets
                        }
                      });
                      
                      // Update Redux state
                      dispatch({
                        type: 'slides/updateSlide',
                        payload: {
                          id: editingSlide.id,
                          field: 'text.bullets',
                          value: newBullets
                        }
                      });
                    }}
                    className="ml-2 text-red-400 hover:text-red-300"
                    title="Remove bullet point"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {/* Add new bullet point button */}
              {(!formState.text.bullets || formState.text.bullets.length < 6) && (
                <button 
                  onClick={() => {
                    // Initialize bullets array if it doesn't exist
                    const currentBullets = formState.text.bullets || [];
                    const newBullets = [...currentBullets, ''];
                    
                    // Update local form state
                    setFormState({
                      ...formState,
                      text: {
                        ...formState.text,
                        bullets: newBullets
                      }
                    });
                    
                    // Update Redux state
                    dispatch({
                      type: 'slides/updateSlide',
                      payload: {
                        id: editingSlide.id,
                        field: 'text.bullets',
                        value: newBullets
                      }
                    });
                  }}
                  className="w-full bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a] hover:text-white p-2 rounded-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Bullet Point
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400">Each bullet point limited to 50 characters. For visual impact, keep to 4-6 bullet points maximum.</p>
          </div>
        )}
      </div>
      
      {/* Call to Action Button */}
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="showCta"
            checked={formState.text.ctaText !== undefined}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  ctaText: e.target.checked ? 'Learn More' : undefined
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.ctaText',
                  value: e.target.checked ? 'Learn More' : undefined
                }
              });
            }}
            className="mr-2"
          />
          <label htmlFor="showCta" className="text-gray-300">Add Call-to-Action Button</label>
        </div>
        
        {formState.text.ctaText !== undefined && (
          <input
            type="text"
            value={formState.text.ctaText || ''}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                text: {
                  ...formState.text,
                  ctaText: e.target.value
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'text.ctaText',
                  value: e.target.value
                }
              });
            }}
            className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
            placeholder="Button Text"
          />
        )}
      </div>
    </div>
  );
};

export default TextSettings;
