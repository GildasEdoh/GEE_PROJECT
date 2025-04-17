import { useState } from 'react';

const DropdownCheckboxPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' }
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (optionId) => {
        setSelectedOptions(prev =>
            prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
    };

    const handleSubmit = () => {
        console.log('Options sélectionnées :', selectedOptions);
        // Traitement des données ici
        alert(`Vous avez sélectionné : ${selectedOptions.join(', ')}`);
    };

    const handleCancel = () => {
        setSelectedOptions([]);
        setIsOpen(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Sélectionnez vos options</h2>

            <div style={styles.dropdownWrapper}>
                <button
                    onClick={toggleDropdown}
                    style={styles.dropdownButton}
                >
                    Choisir des options {isOpen ? '▲' : '▼'}
                </button>

                {isOpen && (
                    <div style={styles.dropdownContent}>
                        {options.map(option => (
                            <label key={option.id} style={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option.id)}
                                    onChange={() => handleCheckboxChange(option.id)}
                                    style={styles.checkbox}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div style={styles.buttonGroup}>
                <button
                    onClick={handleCancel}
                    style={{ ...styles.button, ...styles.cancelButton }}
                >
                    Annuler
                </button>
                <button
                    onClick={handleSubmit}
                    style={{ ...styles.button, ...styles.submitButton }}
                    disabled={selectedOptions.length === 0}
                >
                    Valider
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9'
    },
    title: {
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px'
    },
    dropdownWrapper: {
        position: 'relative',
        marginBottom: '20px'
    },
    dropdownButton: {
        width: '100%',
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownContent: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        marginTop: '5px',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    optionLabel: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#f0f0f0'
        }
    },
    checkbox: {
        marginRight: '10px',
        cursor: 'pointer'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
    },
    button: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        border: 'none',
        transition: 'opacity 0.2s'
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: 'white',
        ':hover': {
            opacity: 0.8
        }
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        ':disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed'
        },
        ':hover:not(:disabled)': {
            opacity: 0.8
        }
    }
};

export default DropdownCheckboxPage;