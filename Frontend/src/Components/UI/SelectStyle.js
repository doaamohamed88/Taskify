const customStyles = {
    control: (base, state) => ({
        ...base,
        padding: '5px', // keep a little padding so the input doesn't shrink
        backgroundColor: 'var(--main-color)',
        border: 'var(--lilac-border)',
        borderRadius: 'var(--border-radius-main)',
        outline: 'none',
        boxShadow: 'none',
        caretColor: 'var(--lilac-color)',
        color: 'var(--lilac-color)',
        '&:hover': {
            border: 'var(--lilac-border)',
        },
    }),
    input: (base) => ({
        ...base,
        color: 'var(--lilac-color)',
        caretColor: 'var(--lilac-color)',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'var(--lilac-color)',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'var(--lilac-color)',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'var(--lilac-color)',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: 'var(--lilac-color)',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: 'var(--lilac-color)',
        ':hover': {
            backgroundColor: 'transparent',
            color: 'red',
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: 'var(--main-color)',
        border: 'var(--lilac-border)',
        borderRadius: 'var(--border-radius-main)',
        padding: '15px',
        color: 'var(--lilac-color)',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: 'var(--lilac-color)',
        cursor: 'pointer',
    }),
};

export default customStyles