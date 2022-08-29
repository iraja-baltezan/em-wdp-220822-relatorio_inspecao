import React from 'react';

function HomePage(props:React.PropsWithChildren) {
    return (
        <main>
            Home page
            {props.children}
        </main>
    );
}

export default HomePage;