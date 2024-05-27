import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={textStyle}>Footer Content</div>
                <p style={smallTextStyle}>Additional footer information here</p>
            </div>
        </footer>
    );
}

const App = () => {
    const appStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const mainContentStyle = {
        flex: 1,
        paddingBottom: '60px', // Adjust based on the footer height
    };

    return (
        <div style={appStyle}>
            <div style={mainContentStyle}>
              
            </div>
            <Footer />
        </div>
    );
}

// Styles
const footerStyle = {
    flexShrink: 0,
    backgroundColor: '#1f2937', // Tailwind bg-gray-800 equivalent
    color: 'white',
    textAlign: 'center',
    padding: '16px 0', // Tailwind py-4 equivalent
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
};

const textStyle = {
    fontSize: '1.125rem', // Tailwind text-lg equivalent
};

const smallTextStyle = {
    fontSize: '0.875rem', // Tailwind text-sm equivalent
};

export default App;
