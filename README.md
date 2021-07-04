# Incode - Project 5
# Pathé Gaumont cinemas

## Installation
This project needs to install node packages and postgres database.
Install postgres database in your system before starting the project installation.
Navigate to the project folder using cmd line, Run the below cmd.

```
npm install
```

The above command will install all the required packages for the project. Once the npm pakages are installed properly. Update ".env" file using ".env template" file as reference and fill all the required details about the postgres DB.

Create database and tables using the below command

```
npm run database-migration
```

Insert sample data on the database using the below command

```
npm run database-seeding
```

Start the server by running the below cmd.

```
npm run dev
```

