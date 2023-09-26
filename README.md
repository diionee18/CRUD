# CRUD
Projektbeskrivning

Detta projekt fokuserar på att implementera en grundläggande CRUD (Create, Read, Update, Delete) funktionalitet för hantering av böcker med hjälp av AWS-tjänster som DynamoDB, Lambda och API Gateway.
CRUD-Operationer

    CREATE: Skapa nya böcker genom att skicka in bokens namn och författare via en HTTP-begäran till API:et. Böcker sparas i en DynamoDB-tabell.

    READ: Hämta information om befintliga böcker genom att anropa API:et utan att skicka några parametrar. API:et returnerar böckernas information.

    UPDATE: Uppdatera befintliga böcker genom att skicka in det gamla bokens namn, det nya bokens namn och den nya författaren via en HTTP-begäran. Bokens information uppdateras i DynamoDB.

    DELETE: Ta bort böcker genom att skicka in bokens namn via en HTTP-begäran. Boken tas bort från DynamoDB-tabellen.

Teknologi

    AWS Lambda-funktioner implementeras för att hantera varje CRUD-operation.
    API Gateway används för att exponera dessa funktioner som HTTP-API-rutter.
    DynamoDB fungerar som databasen för att lagra böcker och deras information.

Projektet möjliggör en enkel hantering av böcker via HTTP-anrop till API:et.


# CREATE

    "BookName": "Skriv bokens namn här",
    "Author": "Skriv författarens namn här"


# READ
    Behöver ingen JSON


# UPDATE

    "OldBookName": "Skriv namnet på befintliga boken som du vill ändra",
    "NewBookName": "Skriv nya bokens namn här",
    "NewAuthor": "Skriv författarens namn här"


# DELETE

    "BookName": "Namnet på boken du vill ta bort"

#  Invoke URL: 
https://e7edpe7nlb.execute-api.eu-north-1.amazonaws.com/V1/books


