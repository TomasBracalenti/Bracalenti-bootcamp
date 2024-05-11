import React from "react";  

const PersonsToShow = ({ persons, search, handleDeletePerson}) => {
    const personsFilter = persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))
    return (
        <div >
            {personsFilter.map((person) => (
                <div key={person.id}>
                    <p>
                        {person.name} {person.number} 
                        <button style={{margin: 10}} onClick={handleDeletePerson} id={person.id}> 
                        delete
                        </button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PersonsToShow;